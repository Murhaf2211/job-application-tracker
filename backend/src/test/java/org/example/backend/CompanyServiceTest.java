package org.example.backend;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.Mockito.*;

class CompanyServiceTest {

    @Mock
    private CompanyRepository companyRepository;

    @InjectMocks
    private CompanyService companyService;

    private Company company;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        // Sample company object for testing
        company = new Company(
                UUID.randomUUID().toString(),
                "CompanyName",
                "Contact Person",
                "Job Title",
                "123-456-7890",
                "email@example.com",
                "https://companywebpage.com",
                "ACTIVE",
                "2024-10-18",
                "Some more info",
                "2024-10-20"
        );
    }

    // Test for getting all companies
    @Test
    void testGetAllCompanies() {
        // Given
        when(companyRepository.findAll()).thenReturn(Arrays.asList(company));

        // When
        List<Company> companies = companyService.getAllCompanies();

        // Then
        assertEquals(1, companies.size());
        assertEquals(company.name(), companies.get(0).name());
        verify(companyRepository, times(1)).findAll();
    }

    // Test for adding a new company
    @Test
    void testAddCompany() {
        // Given
        when(companyRepository.save(any(Company.class))).thenReturn(company);

        // When
        Company newCompany = companyService.addCompany(company);

        // Then
        assertNotNull(newCompany);
        assertEquals(company.name(), newCompany.name());
        verify(companyRepository, times(1)).save(any(Company.class));
    }

    // Test for updating a company
    @Test
    void testUpdateCompany() {
        // Given
        when(companyRepository.findById(anyString())).thenReturn(Optional.of(company));
        when(companyRepository.save(any(Company.class))).thenReturn(company);

        // When
        Company updatedCompany = companyService.updateCompany(company.id(), company);

        // Then
        assertNotNull(updatedCompany);
        assertEquals(company.name(), updatedCompany.name());
        verify(companyRepository, times(1)).findById(anyString());
        verify(companyRepository, times(1)).save(any(Company.class));
    }

    // Test for updating a non-existing company (throws exception)
    @Test
    void testUpdateCompanyNotFound() {
        // Given
        when(companyRepository.findById(anyString())).thenReturn(Optional.empty());

        // When and Then
        Exception exception = assertThrows(RuntimeException.class, () -> {
            companyService.updateCompany(company.id(), company);
        });
        assertEquals("Company not found", exception.getMessage());
        verify(companyRepository, times(1)).findById(anyString());
        verify(companyRepository, never()).save(any(Company.class));
    }

    // Test for deleting a company
    @Test
    void testDeleteCompany() {
        // When
        companyService.deleteCompany(company.id());

        // Then
        verify(companyRepository, times(1)).deleteById(company.id());
    }

    // Test for getting companies by status
    @Test
    void testGetCompaniesByStatus() {
        // Given
        when(companyRepository.findByStatus(anyString())).thenReturn(Arrays.asList(company));

        // When
        List<Company> companies = companyService.getCompaniesByStatus("ACTIVE");

        // Then
        assertEquals(1, companies.size());
        assertEquals(company.name(), companies.get(0).name());
        verify(companyRepository, times(1)).findByStatus(anyString());
    }
}