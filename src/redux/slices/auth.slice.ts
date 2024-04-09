import {createSlice} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  token: null,
  isAuthenticated: false,
};

const authReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.token = null;
      state.isAuthenticated = false;
      AsyncStorage.removeItem('token');
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      AsyncStorage.setItem('token', action.payload);
    },
  },
});

export const {logout, login} = authReducer.actions;
export default authReducer.reducer;
