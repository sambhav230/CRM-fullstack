package com.example.CRM_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CRM_backend.model.Customer;
import com.example.CRM_backend.model.Order;
import com.example.CRM_backend.repository.CustomerRepository;
import com.example.CRM_backend.repository.OrderRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @GetMapping
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @PostMapping
    public Order createOrder(@RequestBody Order order) {
        // 1. Customer find ya create
        String email = order.getCustomer() != null ? order.getCustomer().getEmail() : null;
        Customer customer = null;
        if (email != null && !email.isEmpty()) {
            customer = customerRepository.findByEmail(email);
            if (customer == null) {
                customer = new Customer();
                customer.setEmail(email);
                customer.setName(order.getCustomer().getName());
                customer.setAddress(order.getCustomer().getAddress());
                customer.setCity(order.getCustomer().getCity());
                customer.setState(order.getCustomer().getState());
                customer.setPhone(order.getCustomer().getPhone());
                customer = customerRepository.save(customer);
            }
        }

        // 2. Order fields set karo
        order.setCustomer(customer);
        order.setCustomerName(customer.getName());
        order.setCustomerAddress(customer.getAddress());
        order.setCustomerCity(customer.getCity());
        order.setCustomerState(customer.getState());
        order.setCustomerEmail(customer.getEmail());

        order.setOrderDate(java.time.LocalDateTime.now());

        // 3. Order save karo
        Order savedOrder = orderRepository.save(order);

        // 4. Customer summary update karo
        int totalOrders = orderRepository.countByCustomer(customer);
        Double totalSpend = orderRepository.sumPriceByCustomer(customer);
        java.time.LocalDateTime recentOrderDate = orderRepository.findMostRecentOrderDateByCustomer(customer);

        customer.setTotalOrders(totalOrders);
        customer.setTotalSpend(totalSpend != null ? totalSpend : 0.0);
        customer.setRecentOrderDate(recentOrderDate);
        customerRepository.save(customer);

        return savedOrder;
    }
}
