import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Calendar from 'react-calendar'; // Ensure Bootstrap is imported
import 'react-calendar/dist/Calendar.css'; // Import Calendar styles
import './calendar.css';
interface Company {
    name: string;
    status: string;
    meetingDate?: Date; // Optional meeting date field
}

const CompanyTable: React.FC = () => {
    const companies: Company[] = [
        { name: "Company A", status: "Pending" },
        { name: "Company B", status: "Waiting" },
        { name: "Company C", status: "Negative" },
        { name: "Company D", status: "Positive", meetingDate: new Date(2024, 9, 25) }, // Example meeting date
        { name: "Company E", status: "Pending" },
        { name: "Company F", status: "Waiting" },
        { name: "Company G", status: "Negative" },
        { name: "Company H", status: "Positive", meetingDate: new Date(2024, 9, 30) }, // Example meeting date
    ];

    const pendingCompanies = companies.filter(company => company.status === "Pending");
    const waitingCompanies = companies.filter(company => company.status === "Waiting");
    const negativeCompanies = companies.filter(company => company.status === "Negative");
    const positiveCompanies = companies.filter(company => company.status === "Positive");
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const onDateChange = (date: Date) => {
        setSelectedDate(date);
    };
    // Function to check if the date is a meeting date for positive companies
    const tileClassName = ({ date }: { date: Date }) => {
        const isMeetingDate = positiveCompanies.some(company =>
            company.meetingDate?.toDateString() === date.toDateString()
        );
        return isMeetingDate ? 'highlight-meeting' : null;
    };

    return (
        <div className="container my-4">
            <br/>
            <hr/>
            <h3 className="mb-4">Company Meetings Calendar</h3>
            <Calendar
                onChange={onDateChange}
                value={selectedDate}
                tileClassName={({date}) => {
                    // Highlight meeting dates
                    const meetingDates = positiveCompanies.map(company => company.meetingDate);
                    const currentDate = new Date(); // Get the current date

                    // Check if the date is the current date
                    if (date.toDateString() === currentDate.toDateString()) {
                        return 'highlight-current-day'; // Apply the CSS class for the current day
                    }

                    // Check for meeting dates
                    return meetingDates.some(meetingDate => date.toDateString() === new Date(meetingDate!).toDateString())
                        ? 'highlight-meeting' // Apply the CSS class for highlighting meeting dates
                        : null;
                }}
            />
            <br/>
            <hr/>
            <h3 className="mt-4">Company Status Table</h3>
            <Table responsive bordered hover >
                <thead>
                <tr>
                    <th className="table-header-colour">Pending Company</th>
                    <th className="table-header-colour">Waiting Company</th>
                    <th className="table-header-colour">Negative Company</th>
                    <th className="table-header-colour">Positive Company</th>
                </tr>
                </thead>
                <tbody>
                {Array.from({length: Math.max(pendingCompanies.length, waitingCompanies.length, negativeCompanies.length, positiveCompanies.length)}).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        <td style={{backgroundColor: '#fff3cd'}}>
                            {pendingCompanies[rowIndex] ? pendingCompanies[rowIndex].name : ""}
                        </td>
                        <td style={{backgroundColor: '#cce5ff'}}>
                            {waitingCompanies[rowIndex] ? waitingCompanies[rowIndex].name : ""}
                        </td>
                        <td style={{backgroundColor: '#f8d7da'}}>
                            {negativeCompanies[rowIndex] ? negativeCompanies[rowIndex].name : ""}
                        </td>
                        <td style={{backgroundColor: '#d4edda'}}>
                            {positiveCompanies[rowIndex] ? positiveCompanies[rowIndex].name : ""}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>
        </div>
    );
};

export default CompanyTable;