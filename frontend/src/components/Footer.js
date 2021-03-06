import React from 'react'
import {Container, Row, Col} from "react-bootstrap";
import {Link} from "react-router-dom"

const Footer = () => {
    return (
        <footer>
            <Container>
            <div className="main-footer">
                <Row>
                    <Col sm={12} md={4} lg={3}>
                        <h4>Art Inventor</h4>
                        <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
                        Vivamus et sollicitudin lacus. Aenean gravida eu tortor at tempus.
                        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
                        Etiam at pretium mi. 
                        </p>
                    </Col>
                    <Col  sm={12} md={4} lg={3}>
                    <h4 className="footer-titles">Account Info</h4>
                    <div className="lists">
                        <ul>
                            <Link to="/profile"><li className="list-item">Profile</li></Link>
                            <Link to="/cart"><li className="list-item">My Cart</li></Link>
                            <Link to="/orders"><li className="list-item">My Orders</li></Link>
                        </ul>
                    </div>  
                    </Col>
                    <Col sm={12} md={4} lg={3}>
                    <h4 className="footer-titles">Need Help?</h4>
                    <div className="lists">
                        <ul>
                            <Link><li className="list-item">Help</li></Link>
                            <Link><li className="list-item">Get In Touch</li></Link>
                            <Link><li className="list-item">Product Requests</li></Link>
                        </ul>
                    </div>  
                    </Col>
                    <Col sm={12} md={4} lg={3}>
                    <h4 className="footer-titles">About Us</h4>
                    <div className="lists">
                        <ul>
                            <Link><li className="list-item">About Us</li></Link>
                            <Link><li className="list-item">Blog</li></Link>
                            <Link><li className="list-item">Terms & Conditions</li></Link>
                        </ul>
                    </div>   
                    </Col>
                </Row>
                <Row>
                    <Col className="text-center py-3">
                        Copyright &copy; Day One
                    </Col>
                </Row>
                </div>
            </Container>
        </footer>
    )
}

export default Footer
