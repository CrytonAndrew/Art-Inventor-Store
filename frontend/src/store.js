// Create a store 
// Combine Reducers -> 
// applyMiddlewarre -> allows for adding middleware such as thunk
import { createStore, combineReducers, applyMiddleware } from "redux" 
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// User reducers:
import { userLoginReducer } from "./reducers/userReducers"

// Products Reducer
import { 
    productListReducer,
    productDetailsReducer
 } from "./reducers/productReducers"

// Cart Reducers
import { cartReducer } from "./reducers/cartReducers"

// All reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer
}) 

// Getting the items from storage
const cartItemFromStorage = localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null
    
// loads this first when the redux store loads 
const initialState = {
    cart: { cartItems: cartItemFromStorage },
    userLogin: { userInfo: userInfoFromStorage}
} 

// All the middleware
const middleware =[ thunk ]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store