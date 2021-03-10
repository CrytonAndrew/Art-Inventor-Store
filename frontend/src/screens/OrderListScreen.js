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
        <div className="order-list-div">
        <Row className='align-items-center'>
        <Col>
          <h1>Orders</h1>
        </Col>
      </Row>
      {orders.length === 0 && <Message>There are no orders that have been placed yet</Message>}
          <Table striped bordered hover responsive className='table-sm orders-list-table'>
            <thead>
              <tr>
                <th>ID</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th>Paid Time</th>
                <th>Delivery Time</th>
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
                  {order.isPaid ? <td style={{textAlign: "center"}}>{order.paidAt}</td> : <td style={{textAlign: "center"}}><i className="fas fa-minus"></i></td>}
                  {order.isDelivered ? <td style={{textAlign: "center"}}>{order.deliveredAt}</td> : <td style={{textAlign: "center"}}><i className="fas fa-minus"></i></td>}
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button variant='info' className='btn'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
    )}
    </>
  )
}

export default OrderListScreen