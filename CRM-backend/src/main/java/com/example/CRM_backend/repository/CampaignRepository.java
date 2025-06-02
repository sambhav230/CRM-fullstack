package com.example.CRM_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CRM_backend.model.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}
