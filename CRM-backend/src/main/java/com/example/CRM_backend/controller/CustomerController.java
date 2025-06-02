package com.example.CRM_backend.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CRM_backend.dto.SegmentRequest;
import com.example.CRM_backend.model.Customer;
import com.example.CRM_backend.repository.CustomerRepository;
import com.example.CRM_backend.service.PubSubQueueService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private PubSubQueueService pubSubQueueService;

    // Get all customers
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Get customer by id
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        Optional<Customer> customer = customerRepository.findById(id);
        return customer.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Create new customer (direct DB)
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        if (customer.getEmail() == null || customer.getName() == null) {
            return ResponseEntity.badRequest().build();
        }
        Customer saved = customerRepository.save(customer);
        return ResponseEntity.ok(saved);
    }

    // Ingest customer via pubsub
    @PostMapping("/pubsub")
    public ResponseEntity<String> ingestCustomerPubSub(@RequestBody Customer customer) {
        if (customer.getEmail() == null || customer.getName() == null) {
            return ResponseEntity.badRequest().body("Name and Email are required");
        }
        pubSubQueueService.enqueueCustomer(customer);
        return ResponseEntity.ok("Customer queued for ingestion");
    }

    // Segment customers (filter by rules)
    @PostMapping("/segment")
    public List<Customer> segmentCustomers(@RequestBody SegmentRequest segmentRequest) {
        List<Customer> all = customerRepository.findAll();
        List<Customer> filtered = new ArrayList<>(all);

        for (SegmentRequest.Rule rule : segmentRequest.getRules()) {
            String field = rule.getField();
            String op = rule.getOperator();
            String val = rule.getValue();

            filtered = filtered.stream().filter(c -> {
                try {
                    switch (field) {
                        case "amount":
                            // Total amount spent (sum of all orders)
                            double total = c.getOrders() == null ? 0 :
                                c.getOrders().stream().mapToDouble(o -> o.getPrice() != null ? o.getPrice() : 0).sum();
                            double v = Double.parseDouble(val);
                            if (op.equals(">")) return total > v;
                            if (op.equals("<")) return total < v;
                            if (op.equals("=")) return total == v;
                            break;
                        case "visits":
                            // For demo: visits field add karna ho toh model me add karo
                            break;
                        case "daysInactive":
                            // For demo: daysInactive field add karna ho toh model me add karo
                            break;
                    }
                } catch (Exception e) { return false; }
                return false;
            }).collect(Collectors.toList());
        }
        // (AND logic by default)
        return filtered;
    }

    // Update customer
    @PutMapping("/{id}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable Long id, @RequestBody Customer customerDetails) {
        Optional<Customer> optionalCustomer = customerRepository.findById(id);
        if (!optionalCustomer.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        Customer customer = optionalCustomer.get();
        if (customerDetails.getName() != null) customer.setName(customerDetails.getName());
        if (customerDetails.getEmail() != null) customer.setEmail(customerDetails.getEmail());
        if (customerDetails.getPhone() != null) customer.setPhone(customerDetails.getPhone());
        if (customerDetails.getAddress() != null) customer.setAddress(customerDetails.getAddress());
        if (customerDetails.getCity() != null) customer.setCity(customerDetails.getCity());
        if (customerDetails.getState() != null) customer.setState(customerDetails.getState());
        Customer updated = customerRepository.save(customer);
        return ResponseEntity.ok(updated);
    }

    // Delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCustomer(@PathVariable Long id) {
        if (!customerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        customerRepository.deleteById(id);
        return ResponseEntity.ok("Customer deleted");
    }
}
