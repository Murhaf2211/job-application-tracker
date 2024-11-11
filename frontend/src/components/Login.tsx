import React, { useState } from 'react';
import { Form, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";


interface LoginProps {
    onLogin: () => void;
}
const Login: React.FC<LoginProps> = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        onLogin();
        navigate('/home'); // Redirect to Home page
    };
    const gitLogin = () => {
        const host = window.location.host === 'localhost:5173' ? 'http://localhost:8080': window.location.origin
        window.open(host + '/oauth2/authorization/github', '_self')
    }
    const loadUser = () => {
        gitLogin();
        axios.get('/api/auth/me')
            .then(response => {
                console.log(response.data)
            })
    }

    return (
        <Container className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <Row>
                <Col>
                    <Card style={{width: '25rem'}} className="shadow-sm">
                        <Card.Body>
                            <h1 className="text-center text-primary mb-4">Welcome to JAT</h1><hr/>
                            <p className="text-center text-muted">Organize and track your job applications
                                effortlessly!</p>
                            <br/>
                            <br/>
                            <p className="mb-3">Please sign in to continue:</p>
                            <Form onSubmit={handleLogin}>
                                <Form.Group controlId="username" className="mb-3">
                                    <Form.Control
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="password" className="mb-3">
                                    <Form.Control
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3">
                                    Login
                                </Button>
                                <hr/>
                                <Button
                                    variant="link"
                                    className="w-100 mt-2 text-decoration-none"
                                    onClick={() => navigate('/register')}
                                >
                                    Create an Account
                                </Button>
                                <hr/>
                                <div className="mt-4 text-center">
                                    <Button onClick={loadUser} className="btn btn-outline-dark btn-block">Login
                                        with GitHub</Button>
                                </div>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;