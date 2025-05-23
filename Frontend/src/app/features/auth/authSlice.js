import { createSlice } from "@reduxjs/toolkit";

const storedExpiration = localStorage.getItem("expirationTime");
const isSessionValid =
  storedExpiration && new Date().getTime() < storedExpiration;

const initialState = {
  userInfo: isSessionValid
    ? JSON.parse(localStorage.getItem("userInfo"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredientials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));

      const expirationTime = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; //30 days
      localStorage.setItem("expirationTime", expirationTime);
    },

    logout: (state) => {
      state.userInfo = null;
      localStorage.clear();
    },
  },
});

export const { setCredientials, logout } = authSlice.actions;
export default authSlice.reducer;
