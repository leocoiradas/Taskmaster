import Button from "../Button";
import { useDispatch } from "react-redux";
import { deleteAssignment } from "../../Store/Actions/AssignmentsActions";
import { useNavigate } from "react-router-dom";

function DeleteAssignmentConfirmation({ closeForm, assignmentID }){

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const sendDeleteRequest = () => {
        dispatch(deleteAssignment(assignmentID));
       
    }

    console.log(assignmentID)

    return(
        <article className="flex w-full h-full justify-center items-center text-xl fixed inset-0 z-50 bg-gray-500/50">
            <form action="" method="post" className="flex flex-col p-4 gap-5 bg-white rounded-md">
                <p>Are you sure that you want to delete this assignment?</p>
                <div className="flex justify-around items-center">
                    <Button buttonName = "Delete" buttonColor = "red" eventFunction = {sendDeleteRequest} />
                    <Button buttonName = "Close this form" buttonColor = "blue" eventFunction = {closeForm} />
                </div>
            </form>
        </article>
    )
}
export default DeleteAssignmentConfirmation;