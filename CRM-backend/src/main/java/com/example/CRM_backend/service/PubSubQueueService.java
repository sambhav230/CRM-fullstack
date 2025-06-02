package com.example.CRM_backend.service;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.CRM_backend.model.Customer;
import com.example.CRM_backend.model.Order;
import com.example.CRM_backend.repository.CustomerRepository;
import com.example.CRM_backend.repository.OrderRepository;

import jakarta.annotation.PostConstruct;

@Service
public class PubSubQueueService {

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private OrderRepository orderRepository;

    // Simple in-memory queues
    private final BlockingQueue<Customer> customerQueue = new LinkedBlockingQueue<>();
    private final BlockingQueue<Order> orderQueue = new LinkedBlockingQueue<>();

    // Producer methods (API se call hota hai)
    public void enqueueCustomer(Customer c) {
        customerQueue.offer(c);
    }

    public void enqueueOrder(Order o) {
        orderQueue.offer(o);
    }

    // Consumer thread (background)
    @PostConstruct
    public void startConsumers() {
        // Customer consumer
        new Thread(() -> {
            while (true) {
                try {
                    Customer c = customerQueue.take();
                    customerRepository.save(c);
                    System.out.println("Customer saved from queue: " + c.getEmail());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();

        // Order consumer
        new Thread(() -> {
            while (true) {
                try {
                    Order o = orderQueue.take();
                    orderRepository.save(o);
                    System.out.println("Order saved from queue: " + o.getProduct());
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }).start();
    }
}
