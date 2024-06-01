import { configureStore } from "@reduxjs/toolkit";
import { assignmentsReducer } from "./Reducers/assignmentsReducer";

const store = configureStore({
    reducer: {
        assignmentsCollection: assignmentsReducer,
        
    }
});

export default store;