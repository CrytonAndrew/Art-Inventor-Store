import { 
    USER_DETAILS_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_LOGIN_FAIL, 
    USER_LOGIN_REQUEST, 
    USER_LOGIN_SUCCESS, 
    USER_LOGOUT,
    USER_REGISTER_FAIL,
    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_UPDATE_PROFILE_FAIL,
    USER_UPDATE_PROFILE_REQUEST,
    USER_UPDATE_PROFILE_SUCCESS
} from "../constants/userConstants"

import axios from "axios"

// Using some redux thunk here -> dispatch
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        // We use this to send json data
        // We also use this in order to authorize our token
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }

        // Fetch the data -> Passing in the email and password as the body
        const { data } = await axios.post("/api/users/login", {email, password}, config)

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }


        const { data } = await axios.post("/api/users", { name, email, password }, config)

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    dispatch({ type: USER_LOGOUT })
    document.location.href = '/login'
}

// We need to pass in token
// We getState -> To tap into the userInfo which has the token 
// Id -> for getting the users details for profile is 'profile'
// Else for getting user info for admin we pass in the actual 'id'
export const getUserDetails = (id) => async(dispatch, getState) => {
    try {
            dispatch({
            type: USER_DETAILS_REQUEST
        })

        // Get the token from the state, when the user logges in
        const { userLogin: { userInfo }} = getState()

        // Pass the token
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/users/${id}`, config)

        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error){
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}

export const updateUserProfile = (user) => async(dispatch, useState) => {
    try {
        dispatch({
            type: USER_UPDATE_PROFILE_REQUEST
        })

        const {userLogin: {userInfo} } = useState()

        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put("/api/users/profile", user, config)

        dispatch({
            type: USER_UPDATE_PROFILE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_UPDATE_PROFILE_FAIL,
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}