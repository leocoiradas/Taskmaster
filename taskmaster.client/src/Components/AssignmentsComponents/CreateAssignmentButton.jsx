import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import AssignmentManagerForm from "./AssignmentManagerForm";
import { useDispatch } from "react-redux";
import { getEmployees } from "../../Store/Actions/EmployeesAction";
import { useSelector } from "react-redux";


function CreateAssignmentButton() {
    const [showForm, setShowForm] = useState(false);
    
    const displayAssignmentForm = () => {
        setShowForm(!showForm);
    }

    useEffect(() => {
        dispatch(getEmployees())
    }, [])

    const dispatch = useDispatch()
    const employeesCollection = useSelector((store) => store.employeesCollection.employees)
    return (
        <>
            <button className="w-[30dvw] h-[50dvh] flex flex-col justify-center items-center text-xl font-semibold border-4 border-transparent rounded-md p-2 gap-3  hover:bg-green-500 hover:border-green-500 hover:text-white"
             onClick={displayAssignmentForm}>
                <FaPlus className="text-3xl" />
                <p>Create Assignment</p>
            </button>
            {showForm ? (<AssignmentManagerForm closeForm = {displayAssignmentForm} assignmentDetails={null} employeesList={employeesCollection} />) : null}
        </>
    )
}

export default CreateAssignmentButton;