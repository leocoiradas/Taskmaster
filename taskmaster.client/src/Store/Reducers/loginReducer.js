import { createReducer } from "@reduxjs/toolkit";
import { userLogin, userLogout } from "../Actions/LoginActions";

let initialState = {
    token: "",
    user: {}
}

export const userReducer = createReducer(initialState, (builder) => builder
    .addCase(userLogin.fulfilled, (state, action) => {
        return {
            ...state,
            token: action.payload.token,
            user: action.payload.user
            
        }
    })
    .addCase(userLogout.fulfilled, (state, action) => {
        return {
            ...initialState
        }
    })
)