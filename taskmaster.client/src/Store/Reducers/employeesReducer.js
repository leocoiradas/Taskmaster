import { createReducer } from "@reduxjs/toolkit";
import { getEmployees, createEmployee, editEmployee } from "../Actions/EmployeesAction";

let initialState = {
    employees: []
}

export const employeesReducer = createReducer(initialState, (builder) => builder
    .addCase(getEmployees.fulfilled, (state, action) => {
        return {
            ...state,
            employees: action.payload.employees
        }
    })
    
)

