import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import AssignmentManagerForm from "./AssignmentManagerForm";

function CreateAssignmentButton() {
    const [showForm, setShowForm] = useState(false);
    const displayAssignmentForm = () => {
        setShowForm(!showForm);
    }
    return (
        <>
            <button className="w-[30dvw] h-[50dvh] flex flex-col justify-center items-center text-xl font-semibold border-4 border-transparent rounded-md p-2 gap-3  hover:bg-green-500 hover:border-green-500 hover:text-white"
             onClick={displayAssignmentForm}>
                <FaPlus className="text-3xl" />
                <p>Create Assignment</p>
            </button>
            {showForm ? (<AssignmentManagerForm closeForm = {displayAssignmentForm} assignmentDetails={null} />) : null}
        </>
    )
}

export default CreateAssignmentButton;