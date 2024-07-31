import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';

export const userLogin = createAsyncThunk("user_login", async (tokenRequest) => {
    try {
        const response = await axios.post("https://localhost:5001/api/Authorization/authenticate", tokenRequest)

        const token = response.data.token
        const user = JSON.stringify(response.data.user)

        Cookies.set("token", token, { expires: 1, secure: true, sameSite: "None" })
        Cookies.set("user", user, { expires: 1, secure: true, sameSite: "None" })
        window.location.href = "/dashboard"
        return {
            token: token,
            user: user
        }
    } catch (error) {
        console.log(error)
    }
})

export const userLogout = createAsyncThunk("user_logout", async () => {
    try {
        Cookies.remove('token')
        Cookies.remove('user')
        window.location.href = "/login"
    } catch (error) {
        console.log(error)
    }
})