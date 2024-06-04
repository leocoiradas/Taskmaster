import { useState, useEffect } from "react";
import Button from "../Button";
import { useDispatch } from 'react-redux';
import { editAssignment, createAssignment } from "../../Store/Actions/AssignmentsActions";
import { useNavigate } from "react-router-dom";

function AssignmentManagerForm( { closeForm, assignmentDetails } ) {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    description: "",
    status: "",
    dueAt: new Date()
  })

  useEffect(() => {
    assignmentFormData(assignmentDetails);
  }, [assignmentDetails])

  const assignmentFormData = () => {
    if (assignmentDetails) {
      setAssignmentData({
        title: assignmentDetails.title,
        description: assignmentDetails.description,
        status: assignmentDetails.status,
        dueAt: assignmentDetails.dueAt
      });

      
    } else {
        setAssignmentData({
          title: "",
          description: "",
          status: "",
        })
      }
    }
    


    const formData = (event) => {
      setAssignmentData({
        ...assignmentData,
        [event.target.name]: event.target.value
      });
    }

    const editAssignmentData = async () => {
      dispatch(editAssignment(assignmentData));
      navigate("/dashboard")
    }
    const newAssignmentData = async () => {
      dispatch(createAssignment(assignmentData));
      navigate("/dashboard")
    }
    

    return (
      <section className="w-screen h-screen flex justify-center items-center p-3 fixed inset-0 z-50 bg-gray-500/50">
        <article className="w-full flex justify-center items-center">
          <form action="" method={assignmentDetails ? "put" : "post"} className="w-1/2 flex flex-col justify-center items-start p-3 gap-3 text-xl bg-white rounded-md">
            <label htmlFor="title" className="font-semibold">Title</label>
            <input name="title" type="text" value={assignmentData.title} onChange={formData} className="w-full p-2 border-2 rounded-md border-black" />
            <label htmlFor="description" className="font-semibold">Description</label>
            <textarea name="description" value={assignmentData.description} onChange={formData} className="w-full min-h-80 p-2 border-2 rounded-md border-black" />
            <label htmlFor="status" className="font-semibold">Status</label>
            <div className="flex gap-3">
              <input name="status" id="incomplete" type="radio" value="planned" checked={assignmentData.status == "planned"} onChange={formData} />
              <label htmlFor="incomplete">Planned</label>
              <input name="status" id="in-progress" type="radio" value="in progress" checked={assignmentData.status == "in progress"} onChange={formData} />
              <label htmlFor="in-progress">In progress</label>
              <input name="status" id="complete" type="radio" value="ongoing" checked={assignmentData.status == "ongoing"} onChange={formData} />
              <label htmlFor="complete">Ongoing</label>
            </div>
            <label htmlFor="expiration-date">Expiration Date</label>
            <input type="date" name="expiration-date" value={assignmentData.dueAt} onChange={formData} />
            <div className="flex gap-3">
              <Button buttonName="Send data" buttonColor="blue" eventFunction={assignmentDetails ? editAssignmentData  : newAssignmentData} />
              <Button buttonName="Close form" buttonColor="red" eventFunction={closeForm} />
            </div>
          </form>
        </article>
      </section>
    );
  }

  export default AssignmentManagerForm;