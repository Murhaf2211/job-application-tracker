import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import React from "react";
import {useNavigate} from "react-router-dom";

interface NavbarProps {
    isAuthenticated: boolean;
    onLogout: () => void;

}

const AppNavbar : React.FC<NavbarProps> = ({ isAuthenticated, onLogout, }) => {

    const navigate = useNavigate();

    const handlelogout = () => {
        onLogout();
        navigate('/login'); // Redirect to Home page
    };


    return (
        <Navbar bg="primary" variant="dark" expand="lg" className="rounded-2  mb-4">
            <Container>
                <Navbar.Brand href="#home">
                    <img
                        alt="Logo"
                        src="logo.png"  // the place of logo image in public folder.
                        width="50"
                        height="50"
                        className="d-inline-block align-top rounded-2"
                    />{'  '}
                    &nbsp; J A T
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        {isAuthenticated ? (
                            <Button variant="outline-light" onClick={handlelogout}>
                             Logout
                            </Button>
                            ) : (
                                <Button variant="outline-light" onClick={handlelogout}>
                                   Login
                                </Button>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;