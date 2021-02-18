import React from 'react'
// To call an action -> useDispatch
// To get something from the state -> useState
import { useDispatch, useSelector } from "react-redux"
import {Navbar, Nav, Button, Container, NavDropdown} from 'react-bootstrap'
import {LinkContainer} from "react-router-bootstrap"
 import {logout} from "../actions/userActions"

const Header = () => {
    // Used to call the logout action
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <>
        <header>
            <Navbar bg="dark" variant="dark" className="main-header">
            <Container>
                <LinkContainer to="/"><Navbar.Brand>Since Day One</Navbar.Brand></LinkContainer>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto py-3">
                <LinkContainer to="/cart"><Nav.Link><i className="fas fa-shopping-cart"></i> Cart</Nav.Link></LinkContainer>
                <LinkContainer to="/profile"><Nav.Link ><i className="fas fa-receipt"></i> Orders</Nav.Link></LinkContainer>
                {userInfo 
                ? <NavDropdown title={<i className="fas fa-user">{userInfo.name}</i>} id="basic-nav-dropdown">
                    <LinkContainer to="/profile"><NavDropdown.Item >My Account</NavDropdown.Item></LinkContainer>
                    <NavDropdown.Divider />
                    <LinkContainer to="/help"><NavDropdown.Item>Help</NavDropdown.Item></LinkContainer>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={logoutHandler}>Log Out</NavDropdown.Item>
                </NavDropdown>
                : <LinkContainer to="/login"><Button variant="outline-info">Sign In</Button></LinkContainer>
                }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </header>
        </>
    )
}

export default Header
