import {createReducer} from '@reduxjs/toolkit';
import {
  ADD_TO_CART,
  INCREMENT_ITEM,
  DECREMENT_ITEM,
  CLEAR_CART,
} from './ActionTypes';
import {CartItem} from './index';

interface CartState {
  items: CartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};

export const cartReducer = createReducer(initialState, builder => {
  builder
    .addCase(ADD_TO_CART, (state, action) => {
      const newItem = action.payload as CartItem;
      const existingItem = state.items.find(
        item => item.id === newItem.id && item.size === newItem.size,
      );
      if (existingItem) {
        existingItem.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      state.totalPrice += newItem.price * newItem.quantity;
    })
    .addCase(INCREMENT_ITEM, (state, action) => {
      const itemId = action.payload as number;
      const itemToIncrement = state.items.find(item => item.id === itemId);
      if (itemToIncrement) {
        itemToIncrement.quantity++;
        state.totalPrice += itemToIncrement.price;
      }
    })
    .addCase(DECREMENT_ITEM, (state, action) => {
      const itemId = action.payload as number;
      const itemToDecrement = state.items.find(item => item.id === itemId);
      if (itemToDecrement && itemToDecrement.quantity > 1) {
        itemToDecrement.quantity--;
        state.totalPrice -= itemToDecrement.price;
      } else {
        state.items = state.items.filter(item => item.id !== itemId);
        state.totalPrice -= itemToDecrement ? itemToDecrement.price : 0;
      }
    })
    .addCase(CLEAR_CART, state => {
      state.items = [];
      state.totalPrice = 0;
    });
});
