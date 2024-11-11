package org.example.backend;

import org.example.backend.company.Company;
import org.example.backend.company.CompanyRepository;
import org.example.backend.company.CompanyService;
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
        companyRepository = mock(CompanyRepository.class);// Mock the repository
        companyService = new CompanyService(companyRepository); // Initialize the service with the mock repository

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
    @Test
    void updateCompany_shouldUpdateCompany_whenCompanyExists() {
        Company updatedCompany = new Company(
                "1", "Updated Company", "Sara Doe", "Director", "5555555555",
                "updated@example.com", "www.updatedcompany.com", "Inactive", "2024-03-01",
                "Updated info", "2024-04-01"
        );

        when(companyRepository.findById("1")).thenReturn(Optional.of(existingCompany));
        when(companyRepository.save(updatedCompany)).thenReturn(updatedCompany);
        Company result = companyService.updateCompany("1", updatedCompany);

        verify(companyRepository).findById("1");
        verify(companyRepository).save(updatedCompany);
        assertEquals(updatedCompany, result);
    }

    @Test
    void updateCompany_shouldThrowRuntimeException_whenCompanyDoesNotExist() {
        when(companyRepository.findById("1")).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () -> companyService.updateCompany("1", existingCompany));

        assertEquals("Company not found", exception.getMessage());
        verify(companyRepository).findById("1");
    }
    @Test
    void deleteCompany_shouldDeleteCompany_whenIdExists() {
        companyService.deleteCompany("1");

        verify(companyRepository).deleteById("1");
    }

    @Test
    void getCompaniesByStatus_shouldReturnEmptyList_whenNoCompaniesMatchStatus() {
        when(companyRepository.findByStatus("Inactive")).thenReturn(Collections.emptyList());
        List<Company> result = companyService.getCompaniesByStatus("Inactive");

        assertTrue(result.isEmpty());
        verify(companyRepository).findByStatus("Inactive");
    }

    @Test
    void getCompaniesByStatus_shouldReturnCompaniesMatchingStatus() {
        List<Company> expected = List.of(existingCompany);

        when(companyRepository.findByStatus("Active")).thenReturn(expected);
        List<Company> result = companyService.getCompaniesByStatus("Active");

        assertEquals(expected, result);
        verify(companyRepository).findByStatus("Active");
    }

}