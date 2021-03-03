import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {Form, Button, Row, Col} from "react-bootstrap"
import Message from "../components/Message"
import Spinner from "../components/Spinner"
import { getUserDetails, updateUserProfile } from "../actions/userActions"
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'
import Meta from "../components/Meta"

const ProfileScreen = ({ location, history }) => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()

    // Using this state to check if the user is logged in 
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userDetails = useSelector((state) => state.userDetails)
    const { loading, error, user} = userDetails

    const userUpdateProfile = useSelector(state => state.userUpdateProfile)
    const { success, loading: loadingUpdate} = userUpdateProfile

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        else {
            if(!user || !user.name || success) {
                dispatch({type: USER_UPDATE_PROFILE_RESET})
                dispatch(getUserDetails("profile"))
            }
            else {
                setName(user.name)
                setEmail(user.email)
            }
        }
    }, [dispatch, history, userInfo, user, success])

    const submitHanlder = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Passwords do not match")
        }
        else {
            // Dispatch update profile
            // Update profile takes in a user object
            dispatch(updateUserProfile({id: user._id, name, email, password}))
        }
        
    }

    return (
        <>
        <Meta description={`Your profile screen with your account details: ${name}`} title={`${name}`}/>
        {error && <Message variant="danger">{error}</Message>}
        {message && <Message variant="danger">{message}</Message>}
        {success && <Message variant="success">Successfully Updated Profile</Message>}
        {loading && <Spinner />}
        <Row>
        <Col>
            {loadingUpdate && <Spinner />}
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
