import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', {
                name,
                username,
                password,
                email,
            });
            if (response.status === 200) {
                alert('Registration successful');
                navigate('/');
            }
        } catch (error) {
            setError('Email already in use or other error.');
        }
    };

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Row>
                <Col>
                    <Card style={{width: '24rem'}} className="shadow-sm">
                        <Card.Body>
                            <h3 className="text-center text-primary mb-4">Register</h3>
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="name" className="mb-3">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="email" className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        placeholder="Enter email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                {error && <p className="text-danger text-center">{error}</p>}
                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    Register
                                </Button>
                                <Button
                                    variant="link"
                                    className="w-100 mt-2 text-decoration-none"
                                    onClick={() => navigate('/')}
                                >
                                    Cancel
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Register;