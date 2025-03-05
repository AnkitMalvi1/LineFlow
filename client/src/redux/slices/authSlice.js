import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

// ✅ Decode role from token
const token = localStorage.getItem("token");
const user = token ? jwtDecode(token) : null;

const authSlice = createSlice({
    name: "auth",
    initialState: { user, token },
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload.token;
            state.user = jwtDecode(action.payload.token); // ✅ Decode role from token
            localStorage.setItem("token", action.payload.token);
            localStorage.setItem("user", JSON.stringify(state.user)); // ✅ Store user data
        },
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
    },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
