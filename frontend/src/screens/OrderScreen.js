import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Row, Col, ListGroup, Image, Card} from "react-bootstrap"
import Message  from "../components/Message"
import Spinnner from "../components/Spinner"
import { Link } from 'react-router-dom'
import { getOrderDetails } from "../actions/orderActions"

const OrderScreen = ({match}) => {
    const dispatch = useDispatch()

    const orderId = match.params.id


    const orderDetails = useSelector(state => state.orderDetails)
    const {error, loading, order} = orderDetails

    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        // Using the reduce function to calculate the price of the items in the cart
        order.itemsPrice = addDecimals(Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)))
    }

    useEffect(() => {
       if (!order || order._id !== orderId) {
            dispatch(getOrderDetails(orderId))
       }
    }, [dispatch, order, orderId])


    return loading ? <Spinnner /> : error ? <Message>{error}</Message>  
        : <>
        <h1>Order: {orderId}</h1>
             <Row className="mb-3">
                <Col md={8}>
                    <ListGroup variant="flush">
                    <h2>Shipping</h2>
                        <ListGroup.Item>
                            <p>
                                <strong>Name:</strong> {order.user.name}
                                <br></br>
                                <strong>Email:</strong> <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                                <br></br>
                                <strong>Address:</strong>
                                {order.shippingAddress.address}
                                {order.shippingAddress.city}
                                {order.shippingAddress.postalCode}
                                {order.shippingAddress.country}
                            </p>
                            {order.isDelivered ? <Message variant="success"> Delivered on {order.deliveredAt} </Message>
                            : <Message variant="danger"> Order not Delivered</Message>}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment</h2>
                            <p>
                                <strong>Method: </strong> {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant="success"> Paid on {order.paidAt} </Message>
                            : <Message variant="danger"> Order not Paid</Message>}
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
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>

}

export default OrderScreen
