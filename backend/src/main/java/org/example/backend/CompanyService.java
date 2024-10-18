package org.example.backend;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class CompanyService {

    private final CompanyRepository companyRepository;

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
        Company newCompany = companyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Company not found"));

          Company updatedcompany = new Company(
                 newCompany.id(),
                 company.name(), company.contactPerson(), company.jobTitle(), company.phone(),
                 company.email(), company.companyWebPage(),
                 company.status(), company.date(), company.moreInfo(), company.meetingDate());
         return companyRepository.save(updatedcompany);

    }

    public void deleteCompany(String id) {
        companyRepository.deleteById(id);
    }

    public List<Company> getCompaniesByStatus(String status) {
        return companyRepository.findByStatus(status);
    }

}
