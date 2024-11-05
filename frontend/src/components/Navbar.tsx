
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
interface NavbarProps {
    isAuthenticated: boolean;
    onLogout: () => void;
}
const AppNavbar : React.FC<NavbarProps> = ({ isAuthenticated, onLogout }) => {


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
                        <Button variant="outline-light" onClick={onLogout}>
                            Logout
                        </Button>
                            ) : (
                            <div>Welcome, please log in.</div>
                            )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;