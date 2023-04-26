import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './CustNav.css'
function CustNav(userid) {
    //console.log(userid.userid);
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
                    <Link to={'/customer/' + userid.userid + '/cart'}>Cart</Link>
                    <Link to={'/customer/' + userid.userid + '/orders'}>Dashboard</Link>
                    <Link to={'/' + userid.userid + '/bank_account'}>Add bank Account</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default CustNav;
