import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL
} from "../constants/productConstants"

// A reducer takes in an initial state and an action
// When we create an action reducer we gonna dispatch an action to this reducer
// The action may contain a payload -> with the products data from the server
export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading: false, products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading: false, errror: action.payload}
        default: 
            return state
    }
}
