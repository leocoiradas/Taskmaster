import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getEmployees = createAsyncThunk("get_employees", async () => {
    try {
        const response = await axios.get("https://localhost:5001/api/Employees/get");
        console.log(response)
        return {
            employees: response.data
        };
    } catch (error) {
        console.log(error);
    }
})


export const createEmployee = createAsyncThunk("create_employee", async (obj) => {
    try {
        await axios.post("http://localhost:3000", obj);
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