package com.example.CRM_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CRM_backend.model.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Customer findByEmail(String email);
}
