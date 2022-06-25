import { createSelector } from "@reduxjs/toolkit";
import { Root } from "./store";


export const cartSelector = (state: Root) => state.cart

export const productSelection = (state: Root) => state.product.products
export const filterSelector = (state: Root) => state.product.filter
export const filterProduct = createSelector(productSelection, filterSelector, (products, filter) => {
  return products.filter(e => e.name.includes(filter))
})