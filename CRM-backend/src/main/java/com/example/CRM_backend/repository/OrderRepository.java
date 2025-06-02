package com.example.CRM_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.CRM_backend.model.Customer;
import com.example.CRM_backend.model.Order;

public interface OrderRepository extends JpaRepository<Order, Long> {
    int countByCustomer(Customer customer);

    @Query("SELECT SUM(o.price) FROM Order o WHERE o.customer = :customer")
    Double sumPriceByCustomer(@Param("customer") Customer customer);

    @Query("SELECT MAX(o.orderDate) FROM Order o WHERE o.customer = :customer")
    java.time.LocalDateTime findMostRecentOrderDateByCustomer(@Param("customer") Customer customer);
}
