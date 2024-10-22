package org.example.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;
class CompanyServiceTest {
    private CompanyService companyService;
    private CompanyRepository companyRepository;

    private Company existingCompany;
    private Company newCompany;

    @BeforeEach
    void setUp() {
        companyRepository = mock(CompanyRepository.class);
        companyService = new CompanyService(companyRepository);

        existingCompany = new Company(
                "1", "Existing Company", "Tom Tom", "Manager", "1234567890",
                "tom@example.com", "www.company.com", "Active", "2024-01-01",
                "Some more info", "2024-02-01"
        );
        newCompany = new Company(
                null, "New Company", "Jon Snow", "CEO", "0987654321",
                "jony@example.com", "www.newcompany.com", "Pending", "2024-05-01",
                "Some extra info", "2024-06-01"
        );
    }
    @Test
    void getAllCompanies_shouldReturnEmptyList_whenNoCompaniesExist() {
        when(companyRepository.findAll()).thenReturn(Collections.emptyList());
        List<Company> result = companyService.getAllCompanies();
        assertTrue(result.isEmpty());
        verify(companyRepository).findAll();
    }
    @Test
    void getAllCompanies_shouldReturnListOfCompanies_whenCompaniesExist() {
        List<Company> expected = List.of(existingCompany);
        when(companyRepository.findAll()).thenReturn(expected);
        List<Company> result = companyService.getAllCompanies();
        assertEquals(expected, result);
        verify(companyRepository).findAll();
    }
    @Test
    void addCompany_shouldAddNewCompanyWithGeneratedId() {
        String generatedId = UUID.randomUUID().toString();
        Company expected = new Company(
                generatedId, newCompany.name(), newCompany.contactPerson(), newCompany.jobTitle(),
                newCompany.phone(), newCompany.email(), newCompany.companyWebPage(),
                newCompany.status(), newCompany.date(), newCompany.moreInfo(), newCompany.meetingDate()
        );
        when(companyRepository.save(any(Company.class))).thenReturn(expected);
        Company result = companyService.addCompany(newCompany);
        verify(companyRepository).save(any(Company.class));
        assertEquals(expected, result);
    }
}