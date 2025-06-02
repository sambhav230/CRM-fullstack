package com.example.CRM_backend.controller;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.CRM_backend.model.Campaign;
import com.example.CRM_backend.model.CampaignLog;
import com.example.CRM_backend.model.Customer;
import com.example.CRM_backend.repository.CampaignLogRepository;
import com.example.CRM_backend.repository.CampaignRepository;
import com.example.CRM_backend.repository.CustomerRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {

    @Autowired
    private CampaignRepository campaignRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CampaignLogRepository campaignLogRepository;

    @GetMapping
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }

    @PostMapping
    public Campaign createCampaign(@RequestBody Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    // Run campaign on all customers (or future: segment)
    @PostMapping("/{id}/run")
    public String runCampaign(@PathVariable Long id) {
        Campaign campaign = campaignRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Campaign not found"));
        List<Customer> customers = customerRepository.findAll(); // Future: segment filter

        for (Customer c : customers) {
            // Simulate sending message (dummy vendor)
            String status = Math.random() > 0.1 ? "SENT" : "FAILED"; // 90% success
            CampaignLog log = new CampaignLog();
            log.setCampaign(campaign);
            log.setCustomer(c);
            log.setStatus(status);
            campaignLogRepository.save(log);
        }
        return "Campaign sent to " + customers.size() + " customers!";
    }

    @GetMapping("/{id}/logs")
    public List<CampaignLog> getCampaignLogs(@PathVariable Long id) {
        //Campaign campaign = campaignRepository.findById(id)
          //  .orElseThrow(() -> new RuntimeException("Campaign not found"));
        return campaignLogRepository.findAll().stream()
            .filter(log -> log.getCampaign().getId().equals(id))
            .collect(Collectors.toList()); // Java 8+ compatibility
    }
}
