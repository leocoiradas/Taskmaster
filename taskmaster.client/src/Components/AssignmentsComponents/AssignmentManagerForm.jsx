import { useState, useEffect } from "react";
import Button from "../Button";
import { useDispatch } from 'react-redux';
import { editAssignment, createAssignment } from "../../Store/Actions/AssignmentsActions";

function AssignmentManagerForm({ closeForm, assignmentDetails, employeesList }) {

  const dispatch = useDispatch();

  const [assignmentData, setAssignmentData] = useState({
    title: "",
    employeeAssigned: 0,
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
        employeeAssigned: assignmentDetails.employeeAssigned,
        description: assignmentDetails.description,
        status: assignmentDetails.status,
        dueAt: assignmentDetails.dueAt
      });


    } else {
      setAssignmentData({
        title: "",
        employeeAssigned: 0,
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
    console.log(assignmentData)
  }

  const editAssignmentData = async (event) => {
    event.preventDefault();
    try {
      dispatch(editAssignment(assignmentData));
      window.location.reload(false)
    } catch (error) {
      console.log(error)
    }
    
  }
  const newAssignmentData = async (event) => {
    event.preventDefault();
    try{
      dispatch(createAssignment(assignmentData));
      window.location.reload(false)
    } catch (error){
      console.log(error)
    }
  }

 

  return (
    <section className="w-screen h-screen flex justify-center items-center p-3 fixed inset-0 z-50 bg-gray-500/50">
      <article className="w-full flex justify-center items-center">
        <form action="" method={assignmentDetails ? "put" : "post"} className="w-1/2 flex flex-col justify-center items-center p-3 gap-3 text-xl bg-white rounded-md shadow-md border-2 border-slate-600">
          <fieldset className="w-full flex flex-col gap-3">
            <legend className="text-center font-semibold">{assignmentDetails ? "Edit assignment data" : "Create assignment"}</legend>
            <fieldset>
              <label htmlFor="title" className="font-semibold">Title</label>
              <input name="title" type="text" value={assignmentData.title} onChange={formData} className="w-full p-2 border-2 rounded-md border-black" required />
            </fieldset>
            <fieldset>
              <label htmlFor="description" className="font-semibold">Description</label>
              <textarea name="description" value={assignmentData.description} onChange={formData} className="w-full min-h-48 p-2 border-2 rounded-md border-black" required />
            </fieldset>
            {!assignmentDetails ? (
              <fieldset>
                <label htmlFor="employeeAssigned" className="font-semibold">Employee Assigned</label>
                <select name="employeeAssigned" onChange={formData} className="w-full p-2 border-2 rounded-md border-black" required>
                  <option value={0} selected>Select an employee</option>
                  {employeesList ?  employeesList.map((element) => (
                    <option value={element.employeeId}>{element.employeeId} - {element.name} {element.lastName}</option>
                  )) : null}
                </select>
              </fieldset>
            ) : null}
            <fieldset>
              <label htmlFor="status" className="font-semibold">Status</label>
              <div className="flex gap-3">
                <input name="status" id="incomplete" type="radio" value="planned" checked={assignmentData.status == "planned"} onChange={formData} required />
                <label htmlFor="incomplete">Planned</label>
                <input name="status" id="in-progress" type="radio" value="in progress" checked={assignmentData.status == "in progress"} onChange={formData} required />
                <label htmlFor="in-progress">In progress</label>
                <input name="status" id="complete" type="radio" value="ongoing" checked={assignmentData.status == "ongoing"} onChange={formData} required />
                <label htmlFor="complete">Ongoing</label>
              </div>
            </fieldset>
            <div className="flex flex-col">
              <label htmlFor="dueAt" className="font-semibold">Expiration Date</label>
              <input type="date" name="dueAt" value={assignmentData.dueAt} onChange={formData} required className="w-1/2 p-2" />
            </div>
            <div className="flex gap-3">
              <input type="submit" name="Send data" onClick={assignmentDetails == null ? editAssignmentData : newAssignmentData} className="px-6 py-4 text-center rounded-md text-white bg-blue-700 cursor-pointer" />
              <Button buttonName="Close form" buttonColor="red" eventFunction={closeForm} />
            </div>
          </fieldset>
        </form>
      </article>
    </section>
  );
}

export default AssignmentManagerForm;