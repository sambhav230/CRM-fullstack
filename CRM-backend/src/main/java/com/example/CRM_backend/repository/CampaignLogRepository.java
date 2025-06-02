package com.example.CRM_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.CRM_backend.model.CampaignLog;

public interface CampaignLogRepository extends JpaRepository<CampaignLog, Long> {
}
