import React, {useState, useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Helmet} from "react-helmet"
import {Link} from 'react-router-dom'
import {Row, Col, Image, ListGroup, Card, Button, Form} from "react-bootstrap"
import Rating from "../components/Rating"
import {getProductDetails, createProductReview} from "../actions/productActions"
import { PRODUCT_REVIEW_CREATE_RESET } from "../constants/productConstants"
import Spinner from "../components/Spinner"
import Message from "../components/Message"

// History redirects to a page 
const ProductScreen = ({match, history}) => {
    // Setting the quantity state -> Qty is a component level state
    const [qty, setQty] = useState(1)

    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const productReviewCreate = useSelector((state) => state.productReviewCreate)
    const {error: errorReviewCreate, success: successReviewCreate, loading: loadingReviewCreate} = productReviewCreate

    useEffect(() => {
        if (successReviewCreate) {
            setRating(0)
            setComment("")
        }
        if (!product._id || product._id  !== match.params.id){
            dispatch(getProductDetails(match.params.id))
            dispatch({type: PRODUCT_REVIEW_CREATE_RESET})
        }
    }, [match, dispatch, successReviewCreate, product._id])

    
    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
    }

    const submitReviewHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview({rating, comment}, product._id))
    }

    return <>
        <Helmet>
        <title>{`${product.name}`}</title>
        <meta name="description" content={`Product screen for ${product.name}`} />
        </Helmet>
        <Link className="btn btn-info my-3 rounded" to="/">
            Home Page
        </Link>
        {loading ? <Spinner /> : error ? <Message variant="danger">{error}</Message> : 
        <>
        <Row>
            <Col md={5}>
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
                                <i className="fas fa-heart"></i> Wishlist
                            </Button>
                         </ListGroup.Item>
                         <ListGroup.Item>
                         {product.countInStock <= 0 
                         ? <Button className="btn-block" type="button" variant="primary" disabled>
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </Button>
                        : <Button 
                            onClick={addToCartHandler}
                            className="btn-block" 
                            type="button" 
                            variant="primary"
                            >
                                <i className="fas fa-shopping-cart"></i> Add to Cart
                            </Button>}
                         </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>

        <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {successReviewCreate && (
                    <Message variant='success'>
                      Review submitted successfully
                    </Message>
                  )}
                  {loadingReviewCreate ? <Spinner /> : errorReviewCreate && (
                    <Message variant='danger'>{errorReviewCreate}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button
                        disabled={productReviewCreate}
                        type='submit'
                        variant='primary'
                      >
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review{' '}
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
        }
    </>
    
}

export default ProductScreen
