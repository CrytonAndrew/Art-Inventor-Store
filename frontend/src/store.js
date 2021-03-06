// Create a store 
// Combine Reducers -> 
// applyMiddlewarre -> allows for adding middleware such as thunk
import { createStore, combineReducers, applyMiddleware } from "redux" 
import thunk from "redux-thunk"
import { composeWithDevTools } from "redux-devtools-extension"

// User reducers:
import { 
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer
 } from "./reducers/userReducers"

// Products Reducer
import { 
    productListReducer,
    productDetailsReducer,
    productDeleteReducer,
    productCreateReducer,
    productUpdateReducer,
    productReviewCreateReducer,
    productTopRatedReducer,
    productHoodieReducer,
    productSweaterReducer
 } from "./reducers/productReducers"

// Cart Reducers
import { 
    cartReducer
} from "./reducers/cartReducers"

// Orders reducers
import {
    orderCreateReducer,
    orderDetailsReducer,
    orderPayReducer,
    orderListMyReducer,
    orderListReducer,
    orderDeliverReducer,
} from "./reducers/orderReducers"

// All reducers
const reducer = combineReducers({
    productList: productListReducer,
    productDetails: productDetailsReducer,
    productDelete: productDeleteReducer,
    productCreate: productCreateReducer,
    productUpdate: productUpdateReducer,
    productReviewCreate: productReviewCreateReducer,
    productTopRated: productTopRatedReducer,
    productHoodie: productHoodieReducer,
    productSweater: productSweaterReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
    orderCreate: orderCreateReducer,
    orderDetails: orderDetailsReducer,
    orderPay: orderPayReducer,
    orderListMy: orderListMyReducer,
    orderList: orderListReducer,
    orderDeliver: orderDeliverReducer,
}) 

// Getting the items from storage
const cartItemFromStorage = localStorage.getItem('cartItems') 
        ? JSON.parse(localStorage.getItem('cartItems'))
        : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
        ? JSON.parse(localStorage.getItem('userInfo'))
        : null

// If the is an address we want to add it to the state
// It gets added to out cart state
const shippingAddressFromStorage = localStorage.getItem("shippingAddress") 
        ? JSON.parse(localStorage.getItem("shippingAddress")) 
        : {}

const paymentMethodFromStorage = localStorage.getItem('paymentMethod') 
        ? JSON.stringify(localStorage.getItem('paymentMethod'))
        : ""

// loads this first when the redux store loads 
const initialState = {
    cart: { 
        cartItems: cartItemFromStorage, 
        shippingAddress: shippingAddressFromStorage, 
        paymentMethod: paymentMethodFromStorage
    },
    userLogin: { userInfo: userInfoFromStorage},
    
} 

// All the middleware
const middleware =[ thunk ]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)))

export default store