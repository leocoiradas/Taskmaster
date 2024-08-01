import { createReducer } from "@reduxjs/toolkit";
import { getAssignments, getAssignmentsByEmployee } from "../Actions/AssignmentsActions"

let initialState = {
    assignments: []
}

export const assignmentsReducer = createReducer(initialState, (builder) => builder
    .addCase(getAssignments.fulfilled, (state, action) => {
        return {
            ...state,
            assignments: action.payload.assignmentsCollection
        }
    })
    .addCase(getAssignmentsByEmployee.fulfilled, (state, action) => {
        return {
            ...state,
            employee_assignments: action.payload.assignmentsByEmployee
        }
    }))