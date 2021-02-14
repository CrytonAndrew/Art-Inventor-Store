import {
    CART_ADD_ITEM, 
} from "../constants/cartConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {
    switch (action.type) {
        case CART_ADD_ITEM:
            // Handle if items exists
            const item = action.payload

            const existItem = state.cartItems.find(x => x.product === item.product)

            if (existItem) {
                // Return all the current products if the product exists
                return {
                    ...state,
                    cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
                }
            }
            else {
                // Add the product if it does not exist
                return {
                    ...state,
                    cartItems: [...state.cartItems, item]
                }
            }
            
        default:
            return state
    }
}