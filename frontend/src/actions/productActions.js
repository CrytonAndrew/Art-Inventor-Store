import axios from "axios"
// These are basically the actions we need to perform 
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_DETAILS_FAIL, 
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
} from "../constants/productConstants"


// The actions are what perform all the neccesary requests to our database when needed 
// Rather than the component 
// After the action is performed the state is then stored in the application level
// These are the (Action Creator) for those actions that need to be performed
//
// Make an asynchronous request -> Redux thunk helps (It allows us to create a function within a function)
// Dispatch -> is for dispacthing these action above
export const listProducts = () => async(dispatch) => {
    
    try {
        // Calls in the reducer -> sets loading to true
        // Products are still empty
        dispatch({type: PRODUCT_LIST_REQUEST})

        const {data} = await axios.get("/api/products")

        // Dispatch success with the payload in the reducer being filled with the products
        // This then gets passed down to the state
        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message
        })
    }
}

export const getProductDetails = (id) => async(dispatch) => {
    try {
        dispatch({type: PRODUCT_DETAILS_REQUEST})

        const {data} = await axios.get(`/api/products/${id}`)

        dispatch({
            type: PRODUCT_DETAILS_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DETAILS_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}


export const deleteProduct = (id) => async(dispatch, getState) => {
    try {
        dispatch({type: PRODUCT_DELETE_REQUEST})

        const {userLogin: { userInfo }} = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        await axios.delete(`/api/products/${id}`, config)

        // We are not getting anything back from our backend
        dispatch({
            type: PRODUCT_DELETE_SUCCESS
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_DELETE_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}



export const createProduct = () => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        console.log(userInfo.token)
        
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        // Everytime I make a post request I'm supposed to add a second arguement 
        // with the data I am sending
        // Sendig an object is also allowed to fill up the parameter for a post request
        const { data } = await axios.post(`/api/products`, {} ,config)

        // We are not getting anything back from our backend
        dispatch({
            type: PRODUCT_CREATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_CREATE_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}


export const updateProduct = (product) => async(dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_UPDATE_REQUEST })

        const { userLogin: { userInfo } } = getState()
        
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        
        // Everytime I make a post request I'm supposed to add a second arguement 
        // with the data I am sending
        // Sendig an object is also allowed to fill up the parameter for a post request
        const { data } = await axios.put(`/api/products/${product._id}`, product ,config)

        // We are not getting anything back from our backend
        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_UPDATE_FAIL, 
            payload: error.response && error.response.data.message 
            ? error.response.data.message 
            : error.message
        })
    }
}



