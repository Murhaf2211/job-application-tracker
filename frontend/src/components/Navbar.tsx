
import { Navbar, Nav, Container, Button } from 'react-bootstrap';

const AppNavbar = () => {
    const handleLogout = () => {
        // Logic to handle user logout
        console.log('Logout clicked');
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
                        <Nav.Link href="#user">Signed in as: <strong>User Name</strong></Nav.Link>
                        <Button variant="outline-light" onClick={handleLogout}>
                            Logout
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;