import React, { useEffect } from 'react'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Spinner from '../components/Spinner'
import { getUsersList } from '../actions/userActions'

const UserListScreen = ({ history }) => {

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userList = useSelector((state) => state.userList)
  const {loading: loadingUsers, error: errorUsers, users} = userList


  useEffect(() => {
    if (!userInfo) {
      history.push('/login')
    } else {
      if (!users) {
        dispatch(getUsersList())
      }
    }
    console.log(users)
  }, [dispatch, history, users, userInfo])

  return (
    <Row>
      <Col>
        <h2>Users</h2>
        {loadingUsers ? (
          <Spinner />
        ) : errorUsers ? (
          <Message variant='danger'>{errorUsers}</Message>
        ) : (
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ID</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="fas fa-check" style={{color: "green"}}> </i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                  <td>
                      <Button className='btn-sm' variant='light'>
                        <i className="fas fa-edit"></i>
                      </Button>
                  </td>
                  <td>
                      <Button className='btn-sm' variant='light'>
                        <i className="fas fa-trash"></i>
                      </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  )
}

export default UserListScreen