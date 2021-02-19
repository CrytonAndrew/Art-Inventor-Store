import React, { useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import CheckoutStatus from "../components/CheckoutStatus"
import Message  from "../components/Message"
import { Link } from 'react-router-dom'

const PlaceOrderScreen = () => {
    // const dispatch = useDispatch()


    const cart = useSelector(state => state.cart)


    const placeorderHandler = () => {

    }

    return (
        <>
            <CheckoutStatus step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                <br></br> 
                                {cart.shippingAddress.address}
                                <br></br> 
                                {cart.shippingAddress.city}
                                <br></br> 
                                {cart.shippingAddress.postalCode}
                                <br></br> 
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {cart.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 
                                ?  <Message>Your cart is empty</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {cart.cartItems.map((item, index) => (
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col md={1}>
                                                        <Image src={item.image} alt={item.name} fluid rounded/>
                                                    </Col>
                                                    <Col>
                                                        <Link to={`/product/${item.product}`}>
                                                            {item.name}
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                        {item.qty} X R {item.price} = R {item.qty * item.price}
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>R {cart.itemsPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>R {cart.itemsPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>R {cart.itemsPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>R {cart.itemsPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    type="button" 
                                    className="btn-block" 
                                    disabled={cart.cartItems === 0}
                                    onClick={placeorderHandler}
                                    >
                                        Purchase
                                    </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>

        </>
    )
}

export default PlaceOrderScreen
