import { configureStore } from "@reduxjs/toolkit";
import { assignmentsReducer } from "./Reducers/assignmentsReducer";
import { employeesReducer } from "./Reducers/employeesReducer";
import { userReducer } from "./Reducers/loginReducer";

const store = configureStore({
    reducer: {
        assignmentsCollection: assignmentsReducer,
        employeesCollection: employeesReducer,
        userData: userReducer,
        
    }
});

export default store;