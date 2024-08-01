import Dashboard from "../Components/Dashboard";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getAssignments } from "../Store/Actions/AssignmentsActions";
import Assignment from "../Components/AssignmentsComponents/Assignment";
import CreateAssignmentButton from "../Components/AssignmentsComponents/CreateAssignmentButton";
import LoadingData from "../Components/LoadingData";

function AssignmentCollection(){
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAssignments());
    },[])
    const assignments = useSelector((store) => store.assignmentsCollection.assignments);
    

    return (
        <Dashboard sectionName="Assignments">
            
                <CreateAssignmentButton />
                <Suspense fallback={<LoadingData />}>
                    { 
                        assignments ? 
                            assignments.map((element) => (<Assignment assignment = {element} />))
                            :
                            <LoadingData />
                        
                    }
                </Suspense>
                
                
            
        </Dashboard>
    )
}

export default AssignmentCollection