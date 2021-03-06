import {
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL,
    PRODUCT_CREATE_RESET,
    PRODUCT_CREATE_FAIL,
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_REQUEST,
    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    PRODUCT_REVIEW_CREATE_REQUEST,
    PRODUCT_REVIEW_CREATE_SUCCESS,
    PRODUCT_REVIEW_CREATE_FAIL,
    PRODUCT_REVIEW_CREATE_RESET,
    PRODUCT_TOP_RATED_FAIL,
    PRODUCT_TOP_RATED_SUCCESS,
    PRODUCT_TOP_RATED_REQUEST,
    PRODUCT_HOODIE_REQUEST,
    PRODUCT_HOODIE_SUCCESS,
    PRODUCT_HOODIE_FAIL,
    PRODUCT_SWEATER_FAIL,
    PRODUCT_SWEATER_REQUEST,
    PRODUCT_SWEATER_SUCCESS,
} from "../constants/productConstants"

// A reducer takes in an initial state and an action
// When we create an action reducer we gonna dispatch an action to this reducer
// The action may contain a payload -> with the products data from the server
export const productListReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_LIST_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_LIST_SUCCESS:
            return {
                loading: false, 
                products: action.payload.products, 
                pages: action.payload.pages, 
                page: action.payload.page
            }
        case PRODUCT_LIST_FAIL:
            return {loading: false, errror: action.payload}
        default: 
            return state
    }
}

// Single product reducer
export const productDetailsReducer = (state = {product: { reviews:[] } }, action) => {
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST:
            return {...state, loading: true}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading: false, product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}


// Single product reducer
export const productDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_DELETE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_DELETE_SUCCESS:
            return {
                loading: false, 
                success: true
            }
        case PRODUCT_DELETE_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        default:
            return state
    }
}



// Single product reducer
export const productCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_CREATE_SUCCESS:
            return {
                loading: false, 
                success: true,
                product: action.payload
            }
        case PRODUCT_CREATE_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        case PRODUCT_CREATE_RESET:
            return {}
        default:
            return state
    }
}



// Single product reducer
export const productUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_UPDATE_SUCCESS:
            return {
                loading: false, 
                success: true,
                product: action.payload
            }
        case PRODUCT_UPDATE_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        case PRODUCT_UPDATE_RESET:
            return {}
        default:
            return state
    }
}


// Single product reducer
export const productReviewCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_REVIEW_CREATE_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_REVIEW_CREATE_SUCCESS:
            return {
                loading: false, 
                success: true,
            }
        case PRODUCT_REVIEW_CREATE_FAIL:
            return {
                loading: false, 
                error: action.payload
            }
        case PRODUCT_REVIEW_CREATE_RESET:
            return {}
        default:
            return state
    }
}



export const productTopRatedReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_TOP_RATED_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_TOP_RATED_SUCCESS:
            return {
                loading: false, 
                products: action.payload
            }
        case PRODUCT_TOP_RATED_FAIL:
            return {loading: false, errror: action.payload}
        default: 
            return state
    }
}




export const productHoodieReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_HOODIE_REQUEST:
            return {loading: true, products: []}
        case PRODUCT_HOODIE_SUCCESS:
            return {
                loading: false, 
                products: action.payload.products, 
                pages: action.payload.pages, 
                page: action.payload.page
            }
        case PRODUCT_HOODIE_FAIL:
            return {loading: false, errror: action.payload}
        default: 
            return state
    }
}

export const productSweaterReducer = (state = {products: []}, action) => {
    switch (action.type) {
        case PRODUCT_SWEATER_REQUEST:
            return {
                loading: true, 
                products: []
            }
        case PRODUCT_SWEATER_SUCCESS:
            return {
                laoding: false,
                products: action.payload,
                pages: action.payload.pages, 
                page: action.payload.page
            }
        case PRODUCT_SWEATER_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}
