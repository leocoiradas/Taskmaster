import Button from "../Button";
import AssignmentManagerForm from "./AssignmentManagerForm";
import DeleteAssignmentConfirmation from "./DeleteAssignmentConfirmation";
import { useState } from "react";

function Assignment({assignment}) {
    const [formVisibility, setFormVisibility] = useState(false);
    const [deleteForm, setDeleteForm] = useState(false);

    const showForm = () => {
        setFormVisibility(!formVisibility);
    }
    
    const showDeleteForm = () =>{
        setDeleteForm(!deleteForm)
    }

    var assignmentCreationDate = new Date(assignment.createdAt);
    var assignmentDueDate = new Date(assignment.dueAt);
    var options = { year: 'numeric', month: 'numeric', day: 'numeric' };

    

    return (
        <>
            <article className="w-[30dvw] h-[50dvh] flex flex-col justify-around items-center p-3 gap-3 text-base text-center border-2 border-md rounded-md border-black shadow-2xl">
                <h3 className="text-lg font-bold">{assignment.title}</h3>
                <p>{assignment.description}</p>
                <p>Estado: {assignment.status}</p>
                <div className="flex w-full justify-around items-center gap-5">
                    <div className="flex flex-col">
                        <p>Creado el:</p>
                        <p>{assignmentCreationDate.toLocaleDateString("es-US", options)}</p>
                    </div>
                    <div className="flex flex-col">
                        <p>Válido hasta:</p>
                        <p>{assignmentDueDate.toLocaleDateString("es-US", options)}</p>
                    </div>
                </div>
                <div className="flex w-full justify-around items-center">
                    <button name = "Edit" onClick={showForm} className="bg-blue-500 hover:bg-blue-700 text-white py-4 px-8 rounded-md">Edit</button>
                    <button name = "Delete" onClick={showDeleteForm} className="bg-red-500 hover:bg-red-700 text-white py-4 px-8 rounded-md">Delete</button>
                </div>
                {/*<Button buttonName= {"Delete"} buttonColor={"Red"} eventFunction={showDeleteForm} />*/}
            </article>
            {formVisibility ? <AssignmentManagerForm closeForm={showForm} assignmentDetails={assignment} /> : null}
            {deleteForm ? <DeleteAssignmentConfirmation assignmentID={assignment.assignmentId} closeForm={showDeleteForm} /> : null}
        </>
  );
}

export default Assignment;