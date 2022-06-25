import { configureStore } from "@reduxjs/toolkit";
import { cart, product } from "./slice";


export const store = configureStore({
  reducer: {
    product: product,
    cart: cart
  }
})


export type Root = ReturnType<typeof store.getState>

export type Dispatch = typeof store.dispatch