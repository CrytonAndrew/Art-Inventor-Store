import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Form, Button, Row, Col} from "react-bootstrap"
import Message from "../components/Message"
import Spinner from "../components/Spinner"
import { getUserDetails } from "../actions/userActions"

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user} = userDetails


    useEffect(() => {
        if (userInfo) {
            console.log(user)
            if (!user.name) {
                dispatch(getUserDetails("profile"))
            }
            else {
                // We have the user details
                setName(user.name)
                setEmail(user.email)
            }
        }
        else {
            history.push("/login")
        }
    }, [dispatch, history, userInfo, user, name, email])

    const submitHanlder = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
        }
        else {
            // Dispatch update profile
        }
        
    }

    return (
        <>
        <Row>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {loading && <Spinner />}
        <Col>
            <h1>
                User Name
            </h1>

        </Col>
        <Col className="py-3">
        <h1>Update Account Details:</h1>
        <Form onSubmit={submitHanlder}>
            <Form.Group controlId='name'>
                <Form.Label>New Name: </Form.Label>
                <Form.Control
                    type='name'
                    placeholder="Enter Full Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                ></Form.Control>
            </Form.Group>

            <Form.Group controlId='email'>
                <Form.Label>New Email: </Form.Label>
                <Form.Control
                    type='email'
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                ></Form.Control>
            </Form.Group>

            {/* Password Field */}
            <Form.Group controlId='password'>
                <Form.Label>Password: </Form.Label>
                <Form.Control
                    type='password'
                    placeholder="Enter Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>


            <Form.Group controlId='confirmPassword'>
                <Form.Label>Confirm Password: </Form.Label>
                <Form.Control
                    type='password'
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                ></Form.Control>
            </Form.Group>


            <Button className="btn-block" type="submit" variant="primary"> Update Profile </Button>
        </Form>

        </Col>
        </Row>
        </>
    )
}

export default ProfileScreen
