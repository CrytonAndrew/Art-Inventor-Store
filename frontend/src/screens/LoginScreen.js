// Since it a form some thing state will belong to the component such as the email and password
import React, {useState, useEffect} from 'react'
import { Link } from "react-router-dom"
import {Form, Button, Row, Col} from "react-bootstrap"
import {useDispatch, useSelector} from "react-redux"
import Spinner from "../components/Spinner"
import Message from "../components/Message"
import {login} from "../actions/userActions"
import FormContainer from "../components/FormContainer"


const LoginScreen = ({location, history}) => {

    // This is gonna be used to get the user info
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { loading, error, userInfo} = userLogin
    
    // Check the url for redirect
    const redirect = location.search ? location.search.split("=")[1] : "/"

    useEffect(() => {
        // If our user is already logged in 
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])
    const submitHanlder = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return <FormContainer>
        <h1> Welcome Back</h1>
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Spinner/>}
            <Form onSubmit={submitHanlder}>
            <Form.Group controlId='email'>
                <Form.Label>Email: </Form.Label>
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

            <Button type="submit" variant="primary"> Sign In </Button>
        </Form>

        <Row className="py-3">
            <Col>
                New Customer?{' '}
                <Link to={redirect ? `/register?redirect=${redirect}` : "/register"}>
                    Register
                </Link>
            </Col>
        </Row>
    </FormContainer>
    
}

export default LoginScreen
