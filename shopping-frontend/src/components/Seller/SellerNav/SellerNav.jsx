import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SellerNavbar(userid) {
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">Seller Platform</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link to={'/seller/' + userid.userid + '/AddProduct'}>Add New Product</Link>
                    <Link to={'/seller/' + userid.userid + '/dashboard'}>Dashboard</Link>
                    <Link to={'/' + userid.userid + '/bank_account'}>Add bank Account</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default SellerNavbar;
