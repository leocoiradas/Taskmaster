import EmployeeManagerForm from "./EmployeeManagerForm";
import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";

function CreateEmployeeButton(){
    const [formVisibility, setFormVisibility] = useState(false)

    const showForm = () => {
        setFormVisibility(!formVisibility)
    }

    return (
        <article className="w-full flex justify-start items-center">
            <button onClick={showForm} className="w-40 h-40 flex flex-col justify-center items-center text-xl rounded-md p-3 gap-3 bg-green-700 hover:bg-green-600 text-white">
                <FaUserPlus className="text-3xl" />
                Create Employee
            </button>
            {formVisibility ? <EmployeeManagerForm employeeDetails={null} closeForm={showForm} /> : null}
        </article>
    )
}

export default CreateEmployeeButton