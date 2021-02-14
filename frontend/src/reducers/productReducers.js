import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
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


// Single product reducer
export const productDetailsReducer = (state = {product: {reviews:[]}}, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {loading: true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}
