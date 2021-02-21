import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Button, Row, Col, ListGroup, Image, Card} from "react-bootstrap"
import Message  from "../components/Message"
import Spinnner from "../components/Spinner"
import { Link } from 'react-router-dom'
import { getOrderDetails } from "../actions/orderActions"

const OrderScreen = ({match}) => {
    const dispatch = useDispatch()

    const orderId = match.params.id
    
    const orderDetails = useSelector(state => state.orderDetails)
    const {error, loading, order} = orderDetails


    useEffect(() => {
       dispatch(getOrderDetails(orderId))
    }, [dispatch, orderId])

    const placeorderHandler = () => {
       // Dispacth Payment 
    }

    return loading ? <Spinnner /> : error ? <Message>{error}</Message>  
        : <>
        <h1>Order {orderId}</h1>
             <Row>
                <Col md={8}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address:</strong>
                                <br></br> 
                                {order.shippingAddress.address}
                                <br></br> 
                                {order.shippingAddress.city}
                                <br></br> 
                                {order.shippingAddress.postalCode}
                                <br></br> 
                                {order.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {order.paymentMethod}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {order.orderItems.length === 0 
                                ?  <Message>Your order is empty</Message>
                                : (
                                    <ListGroup variant="flush">
                                        {order.orderItems.map((item, index) => (
                                            <ListGroup.Item key={index}>
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
                                <Col>R {order.itemsPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>R {order.shippingPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>R {order.taxPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>R {order.totalPrice}</Col>
                            </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                {error && <Message>{error}</Message>}
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button 
                                    type="button" 
                                    className="btn-block" 
                                    disabled={order.cartItems === 0}
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

}

export default OrderScreen
