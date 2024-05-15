import {createSlice} from '@reduxjs/toolkit';
import {clear, setItem} from '../../api/localstorage';

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
      clear();
    },
    login: (state, action) => {
      state.isAuthenticated = true;
      setItem('token', action.payload);
    },
  },
});

export const {logout, login} = authReducer.actions;
export default authReducer.reducer;
