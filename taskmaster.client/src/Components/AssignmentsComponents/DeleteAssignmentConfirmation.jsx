import Button from "../Button"
function DeleteAssignmentConfirmation({ deleteAssignment, closeForm }){
    return(
        <article className="flex w-full h-full justify-center items-center text-xl fixed inset-0 z-50 bg-gray-500/50">
            <form action="" method="post" className="flex flex-col p-4 gap-5 bg-white rounded-md">
                <p>Are you sure that you want to delete this assignment?</p>
                <div className="flex justify-around items-center">
                    <Button buttonName = "Delete" buttonColor = "black" eventFunction = {deleteAssignment} />
                    <Button buttonName = "Close" buttonColor = "red" eventFunction = {closeForm} />
                </div>
            </form>
        </article>
    )
}
export default DeleteAssignmentConfirmation;