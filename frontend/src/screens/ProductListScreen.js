import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { listProducts } from '../actions/productActions'

const ProductListScreen = ({history}) => {
    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productList =  useSelector(state => state.productList)
    const {loading, error, products} = productList

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            if (!products) {
                dispatch(listProducts())
            }
        }
        else {
            history.push("/login")
        }
    }, [history, dispatch, userInfo, products])


    const createProductHandler = (product) => {
        console.log("create")
    }

    const deleteProductHandler = (id) => {
        if (window.confirm("Are you sure")) {
            // Delete
        }
    }
    return (
        <>
        <Row>
            <Col>
                <h1>Products</h1> 
            </Col>
            <Col className="text-right">
                <Button 
                    className="my-3"
                    variant="info" 
                    onClick={createProductHandler}
                    >
                    <i className="fas fa-plus-circle"></i> Create Product
                </Button>
            </Col>
        </Row>
          {loading ? <Spinner/> : error ? <Message>{error}</Message> : (
            <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>RATING</th>
              <th>STOCK NO.</th>
              <th>PRICE</th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>{product.rating}</td>
                <td>{product.countInStock}</td>
                <th>R {product.price}</th>
                <th className="my-3">
                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                        <Button variant="info">
                            <i className="fas fa-edit"></i>
                        </Button>
                    </LinkContainer>
                </th>
                <th className="my-3">
                    <Button variant="danger" onClick={deleteProductHandler(product._id)}>
                        <i className="fas fa-trash"></i>
                    </Button>
                </th>
              </tr>
            ))}
          </tbody>
        </Table>
        )}
        </>
    )
}

export default ProductListScreen
