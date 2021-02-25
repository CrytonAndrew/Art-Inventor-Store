import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import {
  listOrders
} from '../actions/orderActions'


const OrderListScreen = ({ history, match }) => {

  const dispatch = useDispatch()


  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const orderList = useSelector(state =>  state.orderList)
  const {loading, error, orders} = orderList

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
        history.push("/login")
    }
    dispatch(listOrders())
  }, [history, userInfo, dispatch])

  
  return (
    <>
    {loading ? <Spinner/> : error ? <Message>{error}</Message> : (
        <>
        <Row className='align-items-center'>
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  {order.isPaid 
                    ? <td><i className="fas fa-check-circle" style={{color: "green"}}></i></td> 
                    : <td><i className="fas fa-check-circle" style={{color: "red"}}></i></td>}
                  {order.isDelivered 
                    ? <td><i className="fas fa-check-circle" style={{color: "green"}}></i></td> 
                    : <td><i className="fas fa-check-circle" style={{color: "red"}}></i></td>}
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
    )}
    </>
  )
}

export default OrderListScreen