// Use effect is for dispatching add to cart as long as our url has an id 
import React, { useEffect } from 'react'
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Col, Row, ListGroup, Image, Form, Buttonm, Card} from "react-bootstrap" 
import Message from "../components/Message"
import {addToCart} from "../actions/cartActions"

// Location is for getting our "qty" value 
const CartScreen = ({match, location, history}) => {
    const productId = match.params.id
    const qty = location.search
    

    return (
        <>
            
        </>
    )
}

export default CartScreen

