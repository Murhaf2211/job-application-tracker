import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form } from 'react-bootstrap';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios';

interface Company {
    id?: string;
    name: string;
    contactPerson: string;
    jobTitle: string;
    phone: string;
    email: string;
    companyWebPage: string;
    status: string;
    date: string;
    moreInfo?: string;
    meetingDate?: string;
}

const CompanyTable: React.FC = () => {
    const [companies, setCompanies] = useState<Company[]>([]);
    const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
    const [showModal, setShowModal] = useState(false);


    // Fetch all companies on component mount
    const fetchCompanies = async () => {
        const response = await axios.get('/api/companies');
        setCompanies(response.data);
    };

    useEffect(() => {
        fetchCompanies();
    }, []);

    // Handle field change for editing company details
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (selectedCompany) {
            const { name, value } = e.target;

            // Clear meetingDate if status is not Positive
            if (name === "status" && value !== "Positive") {
                setSelectedCompany({
                    ...selectedCompany,
                    status: value,
                    meetingDate: ""
                });
            } else {
                setSelectedCompany({
                    ...selectedCompany,
                    [name]: value
                });
            }
        }
    };

    // Handle saving edited company
    const handleSaveCompany = async () => {
        if (selectedCompany) {
            await axios.put(`/api/companies/${selectedCompany.id}`, selectedCompany);
            fetchCompanies(); // Refresh the list after updating
            setShowModal(false);
        }
    };

    // Handle delete company
    const handleDeleteCompany = async () => {
        if (selectedCompany && selectedCompany.id) {
            await axios.delete(`/api/companies/${selectedCompany.id}`);
            fetchCompanies(); // Refresh the list after deleting
            setShowModal(false);
        }
    };

    // Group companies by their status
    const pendingCompanies = companies.filter(company => company.status === "pending");
    const waitingCompanies = companies.filter(company => company.status === "Waiting");
    const negativeCompanies = companies.filter(company => company.status === "Negative");
    const positiveCompanies = companies.filter(company => company.status === "Positive");

    const positiveMeetingDates = companies
        .filter(company => company.status === "Positive" && company.meetingDate)
        .map(company => new Date(company.meetingDate!).toDateString());

    return (
        <div className="container my-4">
            <h3>Company Meetings Calendar</h3>
            <Calendar
                tileClassName={({ date }) => {
                    // Check if the date is a positive meeting date
                    return positiveMeetingDates.includes(date.toDateString()) ? 'highlight-meeting' : null;
                }}
            />
            <br />
            <hr />
            <h3>Company List</h3>
            <Table responsive bordered hover>
                <thead>
                <tr>
                    <th className="table-header-colour">Pending Company</th>
                    <th className="table-header-colour">Waiting Company</th>
                    <th className="table-header-colour">Negative Company</th>
                    <th className="table-header-colour">Positive Company</th>
                </tr>
                </thead>
                <tbody>
                {Array.from({
                    length: Math.max(
                        pendingCompanies.length,
                        waitingCompanies.length,
                        negativeCompanies.length,
                        positiveCompanies.length
                    )
                }).map((_, rowIndex) => (
                    <tr key={rowIndex}>
                        <td className="table-body">
                            {pendingCompanies[rowIndex] ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCompany(pendingCompanies[rowIndex]); setShowModal(true); }}>
                                    {pendingCompanies[rowIndex].name}
                                </a>
                            ) : ""}
                        </td>
                        <td className="table-body">
                            {waitingCompanies[rowIndex] ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCompany(waitingCompanies[rowIndex]); setShowModal(true); }}>
                                    {waitingCompanies[rowIndex].name}
                                </a>
                            ) : ""}
                        </td>
                        <td className="table-body">
                            {negativeCompanies[rowIndex] ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCompany(negativeCompanies[rowIndex]); setShowModal(true); }}>
                                    {negativeCompanies[rowIndex].name}
                                </a>
                            ) : ""}
                        </td>
                        <td className="table-body">
                            {positiveCompanies[rowIndex] ? (
                                <a href="#" onClick={(e) => { e.preventDefault(); setSelectedCompany(positiveCompanies[rowIndex]); setShowModal(true); }}>
                                    {positiveCompanies[rowIndex].name}
                                </a>
                            ) : ""}
                        </td>
                    </tr>
                ))}
                </tbody>
            </Table>

            {/* Modal for editing company */}
            {selectedCompany && (
                <Modal  className="modal" show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit Company Information</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group>
                                <Form.Label className="modalLable">Company Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={selectedCompany.name}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLable">Contact Person</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="contactPerson"
                                    value={selectedCompany.contactPerson}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLable">Job Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="jobTitle"
                                    value={selectedCompany.jobTitle}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLable">Phone Number</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="phone"
                                    value={selectedCompany.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLable">Email </Form.Label>
                                <Form.Control
                                    type="text"
                                    name="email"
                                    value={selectedCompany.email}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLable">Web Page</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="companyWebPage"
                                    value={selectedCompany.companyWebPage}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLableRed">Status</Form.Label>
                                <Form.Control
                                    as="select"
                                    name="status"
                                    value={selectedCompany.status}
                                    onChange={handleChange}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="Waiting">Waiting</option>
                                    <option value="Negative">Negative</option>
                                    <option value="Positive">Positive</option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLable">Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="date"
                                    value={selectedCompany.date}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLable">More Info</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    name="moreInfo"
                                    rows={3}
                                    value={selectedCompany.moreInfo || ""}
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label className="modalLableRed">Meeting Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="meetingDate"
                                    value={selectedCompany.meetingDate || ""}
                                    onChange={handleChange}
                                    disabled={selectedCompany.status === "pending"}
                                />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleDeleteCompany}>
                            Delete
                        </Button>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleSaveCompany}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default CompanyTable;