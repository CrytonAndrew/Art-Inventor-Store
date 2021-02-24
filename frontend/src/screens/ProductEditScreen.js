import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Form } from "react-bootstrap"
import Spinner from "../components/Spinner"
import Message from "../components/Message"
import { getProductDetails } from "../actions/productActions"

const ProductEditScreen = ({match}) => {
    const productId = match.params.id

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [price, setPrice] = useState(0)


    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            dispatch(getProductDetails(productId))
        }
    }, [dispatch, userInfo, productId])

    return (
        <>
           <h1>Edit Product Details</h1>
           {loading  ? <Spinner/> : error ? <Message>{error}</Message> : (
               <Form>
                    <Form.Group controlId='name'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Product Name'
                            value={product.name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Product Category'
                            value={product.category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type='price'
                            placeholder='Product Price'
                            value={product.price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='description'>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Product Description'
                            value={product.description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                        <Form.Label>Product Image</Form.Label>
                        <Form.Control
                            type='image'
                            placeholder='Product Image'
                            value={product.image}
                            onChange={(e) => setImage(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>Product CountInStock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Product CountInStock'
                            value={product.countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        ></Form.Control>
                    </Form.Group>
               </Form>
           )} 
        </>
    )
}

export default ProductEditScreen
