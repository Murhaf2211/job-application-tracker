import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import './calendar.css';

const Sidebar = () => {
    const [formData, setFormData] = useState({
        name: '',
        contactPerson: '',
        jobTitle: '',
        phone: '',
        email: '',
        companyWebPage: '',
        status: 'pending',
        date: '',
        moreInfo: '',
        meetingDate:''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('/api/companies', formData)
            .then(response => {
                console.log("Company added successfully:", response.data);
                setFormData({
                    name: '',
                    contactPerson: '',
                    jobTitle: '',
                    phone: '',
                    email: '',
                    companyWebPage: '',
                    status: 'pending',
                    date: '',
                    moreInfo: '',
                    meetingDate:''
                });
            })
            .catch(error => console.error("Error adding company:", error));
    };

    return (
        <div className="side-br p-4">
            <h4 id="newCompany">New Company</h4><br/><hr/>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter company name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter contact person"
                        name="contactPerson"
                        value={formData.contactPerson}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter job title"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter company web page"
                        name="companyWebPage"
                        value={formData.companyWebPage}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Form.Group controlId="statusSelect">
                    <Form.Label className="formlabel">Status</Form.Label>
                    <Form.Control
                        as="select"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="pending">Pending</option>
                        <option value="waiting">Waiting</option>
                        <option value="negative">Negative</option>
                        <option value="positive">Positive</option>
                    </Form.Control>
                </Form.Group>
                <br/>

                <Form.Group controlId="date">
                    <Form.Control
                        type="date"
                        name="date"
                        max={new Date().toISOString().split('T')[0]}
                        value={formData.date}
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>

                <Form.Group controlId="moreInfo">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter additional information about the company"
                        name="moreInfo"
                        value={formData.moreInfo}
                        onChange={handleChange}
                    />
                </Form.Group><br/>
                <Form.Group controlId="meetingDate">
                    <Form.Label className="formlabel">Meeting Date</Form.Label>
                    <Form.Control
                        type="date"
                        name="meetingDate"
                        max={new Date().toISOString().split('T')[0]}
                        value={formData.meetingDate}
                        onChange={handleChange}
                    />
                </Form.Group>
                <br/>
                <hr/>
                <Button variant="primary" type="submit">
                    Add Company
                </Button>
            </Form>
        </div>
    );
};

export default Sidebar;