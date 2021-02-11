import React from 'react'
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button} from "react-bootstrap"
import Rating from "../components/Rating"
import products from "../products.js"


const ProductScreen = ({match}) => {
    const product = products.find((p) => String(p._id) === match.params.id)
    return <>
        <Link className="btn btn-info my-3 rounded" to="/">
            Home Page
        </Link>
        <Row>
            <Col md={6}>
                <Image className="product_screen_image" src={product.image} alt={product.name} rounded fluid/>
            </Col>
            <Col md={3}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>{product.name}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Rating value={product.rating} text=" reviews"/>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        Price: ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                       {product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                         <ListGroup.Item>
                             <Row>
                                 <Col>
                                     Price: 
                                 </Col>
                                 <Col>
                                     <strong>R{product.price}</strong>
                                 </Col>
                             </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                             <Row>
                                 <Col>
                                     Status: 
                                 </Col>
                                 <Col>
                                     {product.countInStock > 0  ? "Available" : "Out of Stock"}
                                 </Col>
                             </Row>
                         </ListGroup.Item>
                         <ListGroup.Item>
                            <Button className="btn-block" type="button" variant="secondary">
                                <i class="fas fa-heart"></i> Wishlist
                            </Button>
                         </ListGroup.Item>
                         <ListGroup.Item>
                         {product.countInStock <=0 
                         ? <Button className="btn-block" type="button" variant="primary" disabled>
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </Button>
                        : <Button className="btn-block" type="button" variant="primary">
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </Button>}
                         </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
    
}

export default ProductScreen
