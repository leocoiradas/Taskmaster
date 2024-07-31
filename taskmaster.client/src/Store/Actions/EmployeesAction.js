import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const token = Cookies.get("token"); 

export const instance = axios.create({
    baseURL: 'https://localhost:5001', 
    headers: {
        Authorization: `Bearer ${token}`
    }
});
console.log(token)
export const getEmployees = createAsyncThunk("get_employees", async () => {
    try {
        const response = await instance.get("/api/Employees/get");
        return {
            employees: response.data
        };
    } catch (error) {
        console.log(error);
    }
})


export const createEmployee = createAsyncThunk("create_employee", async (obj) => {
    try {
        await axios.post("https://localhost:5001/api/Employees/create", obj);
    } catch (error) {
        console.log(error)
    }
});

export const editEmployee = createAsyncThunk("edit_employee", async (obj) => {
    try {
        await axios.post("http://localhost:3000", obj);
    } catch (error) {
        console.log(error);
    }
})