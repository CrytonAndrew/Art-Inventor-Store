import React, {useEffect} from 'react'
//  Disaptch -> Call an action
// useSelector -> Select parts of the state (we want the productList of the state)
import {useDispatch, useSelector} from "react-redux"
import {Helmet} from "react-helmet";
import {Row, Col} from "react-bootstrap"
import Product from "../components/Product"
import { listProducts } from "../actions/productActions"
import Spinner from "../components/Spinner"
import Message from "../components/Message"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    // Pulling the productList from the state 
    const productList = useSelector((state) => state.productList)
    const {loading, error, products, page, pages} = productList

    // Runs first when the component loads
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber)) // Calling the action to list all the products from the action 
    }, [dispatch, keyword, pageNumber])
    
    return (
        <>
        <Helmet>
        <title>Welcome Since Day One | Home</title>
        <meta name="description" content="Get the best merch (Hoodies, Sweaters, and Many More) for the best prices" />
        </Helmet>
        {!keyword && <ProductCarousel/>}
          <h1>Lastest Products</h1>
          {loading ? <Spinner/> 
          : error ? <Message variant="danger" header="Oops, Something Went Wrong" message={error}/> : 
          <>
          <Row>
              {products.map(product => (
                  <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                  </Col>
              ))}
          </Row>
          <Paginate pages={pages} page={page} keyword={keyword ? keyword : ""}/>
          </>
          }
        </>
    )
}

export default HomeScreen
