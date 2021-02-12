import React, {useState, useEffect} from 'react'
import {Row, Col} from "react-bootstrap"
import Product from "../components/Product"
import axios from "axios"

const HomeScreen = () => {
    // Used to get state with functional componets
    const [products, setProducts] = useState([])

    // Runs first when the component loads
    useEffect(() => {
     
        // Since we can't make useEffect async to use await
        // We make this function to make it asnyc in order to fecth products using axios
       const fetchProducts = async () => {
           const { data } = await  axios.get("/api/products")

            setProducts(data)
       }

       fetchProducts()
    }, [])

    return (
        <>
          <h1>Lastest Products</h1>
          <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                  </Col>
              ))}
          </Row>
        </>
    )
}

export default HomeScreen
