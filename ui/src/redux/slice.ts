import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItemUpdate, CartProp } from "../components/Carts/Cart";
import { Products } from "../type";

interface productSliceState {
  products: Products,
  filter: string
}

const productState: productSliceState = {
  products: [],
  filter: ''
}

const productSlice = createSlice({
  name: 'product',
  initialState: productState,
  reducers: {
    updateFilter: (state, action: PayloadAction<string>) => {
      return {
        ...state, filter: action.payload
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(loadProduct.fulfilled, (state, action: PayloadAction<Products>) => {
      return {
        ...state, products: action.payload
      }
    })
  },
})

export const product = productSlice.reducer

export const { updateFilter } = productSlice.actions

export const loadProduct = createAsyncThunk('product/load', async (): Promise<Products> => {
  const response = await fetch('https://localhost:7244/api/products', {
    method: 'GET'
  })
  return response.json()
})



interface CartState {
  total: number
  items: CartProp[]
}

const cartState: CartState = {
  items: [],
  total: 0
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: cartState,
  reducers: {
    updateItem: (state, action: PayloadAction<CartItemUpdate>) => {
      const index = state.items.findIndex(e => e.id === action.payload.id)
      const newTotal = state.items[index].price * action.payload.quantity
      const diffPrice = newTotal - state.items[index].total
      state.items[index].quantity = action.payload.quantity
      state.items[index].total = newTotal
      state.total += diffPrice
    },
    clear: (state) => {
      return {
        ...state, total: 0, items: []
      }
    }
  },
  extraReducers(builder) {
    builder.addCase(loadCart.fulfilled, (state, action: PayloadAction<CartState>) => {
      return {
        ...state, total: action.payload.total, items: action.payload.items
      }
    })
  },
})

export const cart = cartSlice.reducer 

export const { updateItem, clear } = cartSlice.actions

export const loadCart = createAsyncThunk('cart/get', async (): Promise<CartState> => {
  if (!localStorage.getItem('jwt')){
    return cartState;
  }
  
  const response = await fetch('https://localhost:7244/api/cart', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('jwt')}`
    }
  });

  return await response.json() as CartState
})
