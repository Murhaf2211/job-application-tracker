package org.example.backend;

import lombok.With;

import java.time.LocalDate;

@With
public record Company(
        String id,
        String name,
        String contactPerson,
        String jobTitle,
        String phone,
        String email,
        String companyWebPage,
        String status,
        String date,
        String moreInfo,
        String meetingDate
        ) {
}