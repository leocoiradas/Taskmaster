import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";


export const createAssignment = createAsyncThunk("create_assignment", async (newAssignment) => {
    try {
        await axios.post("https://localhost:5001/api/Assignments/create", newAssignment);
    } catch (error) {
        console.log(error)
    }
})

export const getAssignments = createAsyncThunk("get_assignments", async () => {
    try {
        const response = await axios.get("https://localhost:5001/api/Assignments/assignments");
        //console.log(response.data)
        return {
            assignmentsCollection: response.data
        }
    } catch (error) {
        console.log(error);
    }

});

export const getAssignmentsByEmployee = createAsyncThunk("get_assignments_by_employee", async (assignmentID) => {
    try {
        const response = await axios.get(`http://localhost:3000/${assignmentID}`);
        return {
            assignmentsByEmployee: response.data
        }
    } catch (error) {
        console.log(error);
    }
});

export const editAssignment = createAsyncThunk("edit_assignment", async (assignmentData) => {
    try {
        await axios.put("https://localhost:5001/api/Assignments/update", assignmentData);
    } catch (error) {
        console.log(error);
    }
})

export const deleteAssignment = createAsyncThunk("delete_assignment", async (assignmentID) => {
    try {
        await axios.delete(`https://localhost:5001/Assignments/delete/${assignmentID}`, {
            data: { assignmentID },
          });
    } catch (error) {
        console.log(error);
    }
})