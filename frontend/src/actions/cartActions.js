import axios from "axios" // For requesting the product data based on the ID
import { CART_ADD_ITEM } from "../constants/cartConstants"

// getState gets the entire state tree
// Then we can choose what we want from the state
export const addToCart = (id, qty) => async(dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: CART_ADD_ITEM,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty
        }
    })

    // Adding to local storage
    // Getting the items from our state
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}