import React from 'react'
import {Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap"
import products from "../products"
import Rating from  "../components/Rating"

const ProductScreen = ({match}) => {
    const product = products.find((p) => p._id === match.params.id)
    return (
        <>
           <h1>{product}</h1> 
        </>
    )
}

export default ProductScreen
