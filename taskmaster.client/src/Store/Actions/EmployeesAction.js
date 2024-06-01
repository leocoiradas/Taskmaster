import axios from "axios";
import { CreateAsyncThunk } from "@reduxjs/toolkit";

export const getEmployees = CreateAsyncThunk("get_employees", async () => {
    try {
        const response = await axios.get("http://localhost:3000");
        return {
            employees: response.data.Employees
        };
    } catch (error) {
        console.log(error);
    }
})


export const createEmployee = CreateAsyncThunk("create_employee", async (obj) => {
    try {
        await axios.post("http://localhost:3000", obj);
    } catch (error) {
        console.log(error)
    }
});

export const editEmployee = CreateAsyncThunk("edit_employee", async (obj) => {
    try {
        await axios.post("http://localhost:3000", obj);
    } catch (error) {
        console.log(error);
    }
})