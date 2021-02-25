import React, { useEffect, useState} from 'react'
import {useDispatch, useSelector} from "react-redux"
import { Form, Button } from "react-bootstrap"
import axios from "axios" // Using it for uploading images
import Spinner from "../components/Spinner"
import Message from "../components/Message"
import { getProductDetails, updateProduct } from "../actions/productActions"
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants"

const ProductEditScreen = ({match, history}) => {
    const productId = match.params.id

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [image, setImage] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [price, setPrice] = useState(0)

    const [uploading, setUploading] = useState(false)


    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const productDetails = useSelector((state) => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector((state) => state.productUpdate)
    const {loading: loadingUpdate, error: errorUpdate, success: succcessUpdate} = productUpdate


    useEffect(() => {
        if (succcessUpdate) {
            dispatch({ type: PRODUCT_UPDATE_RESET })
            history.push("/admin/products")
        }
        else {
            if (!userInfo.isAdmin) {
                history.push("/login")
            }
            if (!product || product._id !== productId) {
                dispatch(getProductDetails(productId))
            }
            else {
                setName(product.name)
                setCategory(product.category)
                setCountInStock(product.countInStock)
                setDescription(product.description)
                setImage(product.image)
                setPrice(product.price)
            }
        }
    }, [dispatch, history, userInfo, productId, product, succcessUpdate])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0] // getting the first file in the array
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    "Content-Type": "mutlipart/form-data"
                }
            }

            const { data } = await axios.post('/api/upload', formData, config) 

            console.log(data)
            
            setImage(data)
            setUploading(false)
        } catch (error) {  
            console.log(error)
            setUploading(false)
        }
    }


    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateProduct({_id: productId, name, description, category, countInStock, image, price}))
    }

    return (
        <>
           <h1>Edit Product Details</h1>
           {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
           {loadingUpdate && <Spinner />}
           {loading  ? <Spinner/> : error ? <Message>{error}</Message> : (
               <Form onSubmit={submitHandler}>
                    <Form.Group controlId='name'>
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Product Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='category'>
                        <Form.Label>Product Category</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Product Category'
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='price'>
                        <Form.Label>Product Price</Form.Label>
                        <Form.Control
                            type='price'
                            placeholder='Product Price'
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group controlId='description'>
                        <Form.Label>Product Description</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Product Description'
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='image'>
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter image url'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    ></Form.Control>
                    <Form.File
                        id='image-file'
                        label='Choose File'
                        custom
                        onChange={uploadFileHandler}
                    ></Form.File>
                    {uploading && <Spinner />}
                    </Form.Group>

                    <Form.Group controlId='countinstock'>
                        <Form.Label>Product CountInStock</Form.Label>
                        <Form.Control
                            type='number'
                            placeholder='Product CountInStock'
                            value={countInStock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>

                    <Button type='submit' variant='primary'>
                        Update
                    </Button>
               </Form>
           )} 
        </>
    )
}

export default ProductEditScreen
