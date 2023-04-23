import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import './CustNav.css'
function CustNav() {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">Ecommerce App</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Form className="inline">
                        <FormControl type="text" placeholder="Search" className=" mr-sm-2 mb-0" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Nav>
                <Nav className="ml-auto">
                    <Nav.Link href="www.google.com">Cart</Nav.Link>
                    <Nav.Link href="www.google.com">Dashboard</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustNav;
