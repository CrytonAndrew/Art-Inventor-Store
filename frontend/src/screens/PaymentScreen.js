import React, { useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Form, Button, Col} from "react-bootstrap"
import FormContainer from "../components/FormContainer"
import CheckoutStatus from "../components/CheckoutStatus"
import { savePaymentMethod} from "../actions/cartActions"



const PaymentScreen = ({history}) => {
    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    if (!shippingAddress) {
        history.push("/shipping")
    }

    const [paymentMethod, setPaymentMethod] = useState("Paypal")

    
    const submitHandler = (e) => {
        e.preventDefault()
        // Dispatch to payment screen
        dispatch(savePaymentMethod(paymentMethod))
        history.push("/placeorder")
    }
    return <FormContainer>
    <CheckoutStatus step1 step2 step3/>
    <h1>Payment Method</h1>
        <Form onSubmit={submitHandler}>
        <Form.Group className="mb-4">
            <Form.Label as="legen">Select Method</Form.Label>
        
        <Col>
            <Form.Check 
                type="radio" 
                label="PayPal Or Credit Card" 
                id="paypal"
                name="paymentMethod"
                value="PayPal"
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
                ></Form.Check>
        </Col>
        </Form.Group>
            <Button type="submit" variant="info" className="mt-3">
                Continue
            </Button>
        </Form>
    </FormContainer>
}
export default PaymentScreen
