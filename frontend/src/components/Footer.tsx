
import { Container, Navbar } from 'react-bootstrap';

const Footer = () => {
    return (
        <Navbar bg="primary" variant="dark" fixed="bottom" className="mt-4">
            <Container>
                <Navbar.Text className="mx-auto">
                    © {new Date().getFullYear()} JAT App, Murhaf Orfali.  All Rights Reserved.
                </Navbar.Text>
            </Container>
        </Navbar>
    );
};

export default Footer;