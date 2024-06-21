import { configureStore } from "@reduxjs/toolkit";
import { assignmentsReducer } from "./Reducers/assignmentsReducer";
import { employeesReducer } from "./Reducers/employeesReducer";

const store = configureStore({
    reducer: {
        assignmentsCollection: assignmentsReducer,
        employeesCollection: employeesReducer,
        
    }
});

export default store;