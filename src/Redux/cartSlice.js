import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    cartItems: [],
    totalQty: 0,
    totalAmt: 0,
  },

  reducers: {
    addToCart(state, action) {
        const productIndex = state.cartItems.findIndex(productInd=>
            productInd.id === action.payload.id
        )

        if(productIndex >= 0) {
          state.cartItems[productIndex].cartQty += 1
        }
        else{
            const eachProductIncreament = { ...action.payload, cartQty: 1}
             state.cartItems.push(eachProductIncreament);
        }

    },
  },
});

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer
 
