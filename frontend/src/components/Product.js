import React from 'react'
import {Card, Button} from "react-bootstrap"
import { Link } from 'react-router-dom'
import Rating from "./Rating"

const Product = ({product}) => {
    return (
        <>
     
           <Card className="my-3 p-3 rounded">
                <Link to={`/product/${product._id}`}>
                    <Card.Img src={product.image} variant="top"/>
                </Link>
                <Card.Body>
                    <Link to={`/product/${product._id}`}>
                    <Card.Title>{product.name}</Card.Title>
                    </Link>
                    <Card.Text>
                        <Rating 
                        value={product.rating}
                        text=" reviews"
                        />
                    </Card.Text>
                </Card.Body>
                <Button variant="primary">R{product.price}</Button>
            </Card>
        </>
    )
}

export default Product
