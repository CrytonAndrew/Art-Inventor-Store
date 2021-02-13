import axios from "axios"
// These are basically the actions we need to perform 
import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
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
