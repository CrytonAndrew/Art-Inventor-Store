import React from 'react'
import {Navbar, Nav, Form, Button, FormControl, Container} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
 

const Header = () => {
    return (
        <>
        <header>
            <Navbar bg="dark" variant="dark" className="main-header">
            <Container>
                <Navbar.Brand>Since Day One</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <Nav.Link href="/cart"><i className="fas fa-shopping-cart"></i> Cart</Nav.Link>
                <Nav.Link href="/orders"><i class="fas fa-receipt"></i> Orders</Nav.Link>
                <Nav.Link href="/profile"><i class="fas fa-user"></i> Profile</Nav.Link>
                <Button href="/login" variant="outline-info">Sign In</Button>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
        </>
    )
}

export default Header
