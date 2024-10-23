
import { Button, Form } from 'react-bootstrap';
import './calendar.css';

const Sidebar = () => {

    return (
        <div className="side-br p-4" >
            <h4>New Company</h4><br/><hr/>
            <Form>
                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter company name"
                        name="name"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter contact person"
                        name="contactPerson"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter job title"
                        name="jobTitle"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter phone number"
                        name="phone"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                        name="email"
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Control
                        type="text"
                        placeholder="Enter company web page"
                        name="companyWebPage"
                    />
                </Form.Group>
                <Form.Group controlId="statusSelect">
                    <Form.Label>Status</Form.Label>
                    <Form.Control as="select">
                        <option value="pending">Pending</option>
                        <option value="waiting">Waiting</option>
                        <option value="negative">Negative</option>
                        <option value="positive">Positive</option>
                    </Form.Control>
                </Form.Group>
                <br/>
                {/* Date Input for Meeting Date */}
                <Form.Group controlId="meetingDate">
                    <Form.Control
                        type="date"
                        max={new Date().toISOString().split('T')[0]} // Optional: to prevent future dates
                    />
                </Form.Group>
                <br/>
                <Form.Group controlId="moreInfo">
                    <Form.Control
                        as="textarea"
                        rows={3}
                        placeholder="Enter additional information about the company"
                    />
                </Form.Group><br/>
                <hr/>
                <Button variant="primary" type="submit">
                    Add Company
                </Button>
            </Form>
        </div>
    );
};

export default Sidebar;