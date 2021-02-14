import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from "react-bootstrap"
import Rating from "../components/Rating"
import {getProductDetails} from "../actions/productActions"
import Spinner from "../components/Spinner"
import Message from "../components/Message"

// History redirects to a page 
const ProductScreen = ({match, history}) => {
    // Setting the quantity state -> Qty is a component level state
    const [qty, setQty] = useState(0)

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    

    useEffect(() => {
       dispatch(getProductDetails(match.params.id))
    }, [match, dispatch])

    
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    return <>
        <Link className="btn btn-info my-3 rounded" to="/">
            Home Page
        </Link>
        {loading ? <Spinner /> : error ? <Message variant="danger" header="Oops! Something went wrong" message={error}/> : <Row>
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

                         {product.countInStock > 0 && (
                             <ListGroup.Item>
                                 <Row>
                                     <Col>Qty</Col>
                                     <Col>
                                         <Form.Control as="select" value={qty} onChange={(e) => setQty(e.target.value)}>
                                            {[...Array(product.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x+1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                         </Form.Control>
                                     </Col>
                                 </Row>
                             </ListGroup.Item>
                         )}
                         <ListGroup.Item>
                            <Button className="btn-block" type="button" variant="secondary">
                                <i class="fas fa-heart"></i> Wishlist
                            </Button>
                         </ListGroup.Item>
                         <ListGroup.Item>
                         {product.countInStock <= 0 
                         ? <Button className="btn-block" type="button" variant="primary" disabled>
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </Button>
                        : <Button 
                            onClick={addToCartHandler}
                            className="btn-block" 
                            type="button" 
                            variant="primary"
                            >
                                <i class="fas fa-shopping-cart"></i> Add to Cart
                            </Button>}
                         </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>}
    </>
    
}

export default ProductScreen
