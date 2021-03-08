import React, {useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"
import {Link} from "react-router-dom"
import { Carousel, Image } from "react-bootstrap"
import Spinner from "./Spinner"
import Message from "./Message"
import {getTopRatedProducts} from "../actions/productActions"

const ProductCarousel = () => {
    const dispatch = useDispatch()

    const productTopRated =  useSelector(state => state.productTopRated)
    const {loading, error, products}  = productTopRated

    useEffect(() => {
        dispatch(getTopRatedProducts())
    }, [dispatch])
    return loading ? <Spinner /> : error ? <Message>{error}</Message> : (
        <Carousel pause="hover" className="bg-light">
            {products.map(product => (
                <Carousel.Item key={product._id}>
                    <Link to={`/product/${product._id}`}>
                    {/* I'will fix this */}
                        <Image src="/images/carousel/red-hoodie-carousel.jpeg" alt={product.name} className="carousel-img"/>
                        <Carousel.Caption className="carousel-caption">
                            <h2>
                                {product.name}
                            </h2>
                        </Carousel.Caption>
                    </Link>
                </Carousel.Item>
            ))}
        </Carousel>
    )
}

export default ProductCarousel
