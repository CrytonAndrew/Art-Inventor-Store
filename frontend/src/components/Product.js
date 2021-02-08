import React from 'react'
import {Card} from "react-bootstrap"
import { Link } from 'react-router-dom'
import Rating from "./Rating"

const Product = (props) => {
    return (
        <>
            <Card className="my-3 p-3 rounded" style={{width: '17rem'}}>
                <Card.Img variant="top" src={props.product.image} />
                <Card.Body>
                    <Link to={`/product/${props.product._id}`}><Card.Title>{props.product.name}</Card.Title></Link>
                    <Card.Text>
                    <Rating 
                        color="gold"
                        value={props.product.rating}
                        text={`${props.product.numReviews} reviews`}
                    />
                    </Card.Text>
                    <Card.Text as="h4">
                        R {props.product.price}
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product
