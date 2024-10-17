package org.example.backend;

import java.util.List;
import java.util.UUID;

public class CompanyService {

    private CompanyRepository companyRepository;

    public List<Company> getAllCompanies() {
        return companyRepository.findAll();
    }

    public Company addCompany(Company company) {
        Company newCompany = new Company(
                UUID.randomUUID().toString(),
                company.name(),
                company.contactPerson(),
                company.jobTitle(),
                company.phone(),
                company.email(),
                company.companyWebPage(),
                company.status(),
                company.date(),
                company.moreInfo(),
                company.meetingDate()
        );
        return companyRepository.save(newCompany);
    }
    public Company updateCompany(String id, Company company) {
        return companyRepository.findById(UUID.fromString(id))
                .map(existingCompany -> companyRepository.save(company))
                .orElseThrow(() -> new RuntimeException("Company not found"));
    }
}
