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

export const createAssignment = createAsyncThunk("create_assignment", async (newAssignment) => {
    try {
        await instance.post("/api/Assignments/create", newAssignment);
    } catch (error) {
        console.log(error)
    }
})

export const getAssignments = createAsyncThunk("get_assignments", async () => {
    try {
        const response = await instance.get("/api/Assignments/assignments");
        return {
            assignmentsCollection: response.data
        }
    } catch (error) {
        console.log(error);
    }

});

export const getAssignmentsByEmployee = createAsyncThunk("get_assignments_by_employee", async (assignmentID) => {
    try {
        const response = await instance.get(`http://localhost:3000/${assignmentID}`);
        return {
            assignmentsByEmployee: response.data
        }
    } catch (error) {
        console.log(error);
    }
});

export const editAssignment = createAsyncThunk("edit_assignment", async (assignmentData) => {
    try {
        await instance.put("/api/Assignments/update", assignmentData);
        return window.location.reload()
    } catch (error) {
        console.log(error);
    }
})

export const deleteAssignment = createAsyncThunk("delete_assignment", async (assignmentID) => {
    try {
        await instance.delete(`/Assignments/delete/${assignmentID}`, {
            data: { assignmentID },
          });
    } catch (error) {
        console.log(error);
    }
})