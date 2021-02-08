import React from 'react'
import {Navbar, Nav, Form, Button, FormControl, Container} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
 

const Header = () => {
    return (
        <>
        <header>
            <Navbar bg="dark" variant="dark">
            <Container>
                <LinkContainer to="/">
                <Navbar.Brand href="#home">Day One</Navbar.Brand>
                </LinkContainer>
                <Nav className="mr-auto">
                <LinkContainer to="/">
                    <Nav.Link href="#home">Home</Nav.Link>
                </LinkContainer>
                <Nav.Link href="#features"><i class="fas fa-shopping-cart"></i>Cart</Nav.Link>
                <Nav.Link href="#pricing">Login</Nav.Link>
                </Nav>
                <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-info">Search</Button>
                </Form>
                </Container> 
            </Navbar>
        </header>
        </>
    )
}

export default Header
