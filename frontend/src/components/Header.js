import React from 'react'
import {Navbar, Nav, Button, Container} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
 

const Header = () => {
    return (
        <>
        <header>
            <Navbar bg="dark" variant="dark" className="main-header">
            <Container>
                <LinkContainer to="/"><Navbar.Brand>Since Day One</Navbar.Brand></LinkContainer>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                <LinkContainer to="/cart"><Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link></LinkContainer>
                <LinkContainer to="/profile"><Nav.Link ><i className="fas fa-receipt"></i> Orders</Nav.Link></LinkContainer>
                <LinkContainer to="/profile"><Nav.Link><i className="fas fa-user"></i> Profile</Nav.Link></LinkContainer>
                <LinkContainer to="/login"><Button variant="outline-info">Sign In</Button></LinkContainer>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
        </>
    )
}

export default Header
