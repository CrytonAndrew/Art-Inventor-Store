import React from 'react'
import {Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap"
import products from "../products"
import Rating from  "../components/Rating"

const ProductScreen = ({ match }) => {
    const product = products.find({id: match.params.id})

    return (
        <>
           <h1>{product.category}</h1> 
        </>
    )
}

export default ProductScreen
