import React, { useEffect, useState} from 'react'
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { PayPalButton } from "react-paypal-button-v2"
import { Row, Col, ListGroup, Image, Card, Button} from "react-bootstrap"
import Message  from "../components/Message"
import Spinnner from "../components/Spinner"
import { Link } from 'react-router-dom'
import { payOrder, getOrderDetails } from "../actions/orderActions"
import { ORDER_PAY_RESET } from "../constants/orderConstants"

const OrderScreen = ({match}) => {
    const dispatch = useDispatch()

    const [sdkReady, setSdkReady] = useState(false)

    const orderId = match.params.id

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const {error, loading, order} = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const {loading: loadingPay, success: successPay} = orderPay


    if (!loading) {
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }
    
        // Using the reduce function to calculate the price of the items in the cart
        order.itemsPrice = addDecimals(Number(order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)))
    }

    useEffect(() => {
        const addPayPalScript = async () => {

            const {data: clientId} = await axios.get("/api/config/paypal")
            
            // Create the js script
            const script = document.createElement('script')
            script.type = "text/javascript"
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true

            script.onload = () => {
                setSdkReady(true)
            }

            document.body.appendChild(script)
        }

        // If the order gets paid, the order gets reloaded 
        // After the reload the order comes back paid
        if (!order || order._id !== orderId || successPay) {
            
            // This reset removes a never ending loop once 
            // we pay for the order
            dispatch({
                type: ORDER_PAY_RESET
            })

            dispatch(getOrderDetails(orderId))
        } 
        else if (!order.isPaid) {
            // If the order is not paid 
            // We check if the scipt is not there, then we add the script
            if (!window.paypal) {
               addPayPalScript()
            }
            else {
               setSdkReady(true)
            }
       }
    }, [dispatch, order, orderId, successPay])

    const successPaymentHandler = (paymemtResult) => {
        dispatch(payOrder(orderId, paymemtResult))
    }

    return loading ? <Spinnner /> : error ? <Message>{error}</Message>  : <>
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
                            {!order.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Spinnner />}
                                    {!sdkReady ? <Spinnner /> : (
                                        <PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>
                                    )}
                                </ListGroup.Item>
                            )}
                            {userInfo.isAdmin && <ListGroup.Item>
                                <Button className="btn-block">Mark As Delivered</Button>
                            </ListGroup.Item>}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>

}

export default OrderScreen
