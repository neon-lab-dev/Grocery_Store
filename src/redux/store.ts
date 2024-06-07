import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/auth.slice';
import {cartReducer} from './slices/cart.slice';
import networkReducer from './slices/networkSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    network: networkReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
