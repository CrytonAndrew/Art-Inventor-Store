import React, {useEffect} from 'react'
//  Disaptch -> Call an action
// useSelector -> Select parts of the state (we want the productList of the state)
import {useDispatch, useSelector} from "react-redux"
import {Row, Col} from "react-bootstrap"
import Product from "../components/Product"
import { listProducts, listHoodieProducts} from "../actions/productActions"
import Spinner from "../components/Spinner"
import Message from "../components/Message"
import Paginate from "../components/Paginate"
import ProductCarousel from "../components/ProductCarousel"
import Meta from "../components/Meta"

const HomeScreen = ({match}) => {
    const keyword = match.params.keyword
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    // Pulling the productList from the state 
    const productList = useSelector((state) => state.productList)
    const {loading, error, products, page, pages} = productList

    const productHoodie = useSelector((state) => state.productHoodie)
    const {
        loading: loadingHoodie, 
        error: errorHoodie, 
        products: productsHoodie, 
        page: pageHoodie, 
        pages: pagesHoodie
    } = productHoodie

    // Runs first when the component loads
    useEffect(() => {
        dispatch(listProducts(keyword, pageNumber)) // Calling the action to list all the products from the action 
        dispatch(listHoodieProducts(pageNumber))
    }, [dispatch, keyword, pageNumber])
    
    return (
        <>
        <Meta 
            description="Get the best merch (Hoodies, Sweaters, and Many More) for the best prices" 
            title="Welcome Since Day One | Home"
            />
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
          
          {!keyword && loadingHoodie ? <Spinner /> : errorHoodie ? <Message>{errorHoodie}</Message> : <>
            <h1>Lastest Hoodies</h1>
              <Row>
                  {productsHoodie.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                      <Product product={product}/>
                    </Col>
                  ))}
              </Row>
              {/* <Paginate pages={pagesHoodie} page={pageHoodie} keyword={""}/> */}
          </>}
        </>
    )
}

export default HomeScreen
