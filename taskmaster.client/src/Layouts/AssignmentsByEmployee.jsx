import Dashboard from "../Components/Dashboard";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAssignmentsByEmployee } from "../Store/Actions/AssignmentsActions";
import Assignment from "../Components/AssignmentsComponents/Assignment";
import CreateAssignmentButton from "../Components/AssignmentsComponents/CreateAssignmentButton";

function AssignmentsByEmployee(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAssignmentsByEmployee);
    });

    const assignments = useSelector((store) => store.assignmentsReducer.assignmentsByEmployee);

    return (
        <Dashboard>
            <CreateAssignmentButton />
            {assignments.map((element) => (<Assignment assignment = {element} />))}
        </Dashboard>
    )
}

export default AssignmentsByEmployee;