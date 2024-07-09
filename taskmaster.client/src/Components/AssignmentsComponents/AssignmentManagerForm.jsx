import Button from "../Button";
import { useDispatch } from 'react-redux';
import { editAssignment, createAssignment } from "../../Store/Actions/AssignmentsActions";
import Joi from 'joi';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';


function AssignmentManagerForm({ closeForm, assignmentDetails, employeesList}) {


  const schema = Joi.object({
    title: Joi.string().trim().required().min(4).max(200).messages({
      "string.base": "* Title should be an element of type 'text'." ,
      "string.min": "* Title length should be longer than 4 characters.",
      "string.empty": "* Please write a title for the assignment.",
      "string.max": "* Title length should be shorter than 200 characters.",
      "any.required": "* Title is required."
    }),
    employeeAssigned: Joi.number().required().min(1).messages({
      "number.empty": "* You must assign the task to a valid employee.",
      "number.min": "* You must select a valid employee.",
      "any.required": "* An employee must be selected."
    }),
    description: Joi.string().trim().required().messages({
      "string.empty": "* Describe the objectives and details of the assignment.",
      "any.required": "* Description is required."
    }),
    status: Joi.string().required().messages({
      "string.empty": "* Please select a valid status.",
      "any.required": "* You must select a status for the assignment."
    }),
    dueAt: Joi.date().required().greater("now").messages({
      "any.required": "* You must set an expiring date for the assignment.",
      "date.greater": "* The date should be greater than today.",
      "date.base": "* Please enter a valid date."
    }),
  });

  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    resolver: joiResolver(schema),
    defaultValues: assignmentDetails ? 
      {
        title: assignmentDetails.title,
        employeeAssigned: assignmentDetails.employeeAssigned,
        description: assignmentDetails.description,
        status:  assignmentDetails.status,
        dueAt: assignmentDetails.dueAt,

      } : 
      {
        title: "",
        employeeAssigned: 0,
        description: "",
        status:  "",
        dueAt: new Date().toLocaleDateString(),

      }
  })

  const dispatch = useDispatch();

  const submitData = handleSubmit((data) => {
    const formData = data;
    formData.dueAt = new Date(formData.dueAt).toISOString().split('T')[0]
    alert("Sending assignment data.");
    assignmentDetails ? dispatch(editAssignment(formData)) : dispatch(createAssignment(formData));
    console.log(formData)
    console.log(errors);
  })

  return (
    <section className="w-screen h-screen flex justify-center items-center p-3 fixed inset-0 z-50 bg-gray-500/50">
      <article className="w-full flex justify-center items-center">
        <form onSubmit={submitData} className="w-1/2 max-h-screen flex flex-col justify-center items-center p-3 gap-5 text-xl bg-white rounded-md shadow-md border-2 border-slate-600">
          <fieldset className="w-full flex flex-col gap-5">
            <legend className="text-center font-semibold">{assignmentDetails ? "Edit assignment data" : "Create assignment"}</legend>
            <fieldset className="flex flex-wrap">
              <label htmlFor="title" className="flex-1 font-semibold">Title</label> {errors.title && <p className="inline text-right text-lg text-red-600">{errors.title?.message}</p>}
              <input type="text" {...register("title")} id="title" className="block w-full p-2 border-2 rounded-md border-black" />
            </fieldset>
            <fieldset className="flex flex-wrap">
              <label htmlFor="description" className="flex-1 font-semibold">Description</label> {errors.description && <span className="text-lg text-red-600">{errors.description?.message}</span>}
              <textarea {...register("description")} id="description" className="block w-full min-h-48 p-2 border-2 rounded-md border-black" />
            </fieldset>

            {!assignmentDetails ? (
              <fieldset className="flex flex-wrap">
                <label htmlFor="employeeAssigned" className="flex-1 font-semibold">Employee Assigned</label> {errors.employeeAssigned && <span className="text-lg text-red-600">{errors.employeeAssigned?.message}</span>}
                <select {...register("employeeAssigned")} id="employeeAssigned" className="block w-full p-2 border-2 rounded-md border-black">
                  <option value={0} disabled selected>Select an employee</option>
                  {employeesList ? employeesList.map((element) => (
                    <option value={element.employeeId}>{element.employeeId} - {element.name} {element.lastName}</option>
                  )) : null}
                </select>
              </fieldset>
            ) : null}

            <fieldset className="flex flex-wrap">
              <label htmlFor="status" className="flex-1 font-semibold">Status</label> {errors.status && <span className="text-lg text-red-600">{errors.status?.message}</span>}
              <div className="block w-full">
                <div className="flex gap-3">
                  <input {...register("status")} type="radio" value="planned" checked={watch("status") == "planned"} />
                  <label htmlFor="incomplete">Planned</label>
                  <input {...register("status")} type="radio" value="in progress" checked={watch("status") == "in progress"} />
                  <label htmlFor="in-progress">In progress</label>
                  <input {...register("status")} type="radio" value="ongoing" checked={watch("status") == "ongoing"} />
                  <label htmlFor="complete">Ongoing</label>
                </div>
              </div>
            </fieldset>
            <fieldset className="flex flex-wrap">
              <label htmlFor="dueAt" className="flex-1 font-semibold">Expiration Date</label> {errors.dueAt && <span className="text-lg text-red-600">{errors.dueAt?.message}</span>}
              <input type="date" {...register("dueAt")} className="block w-full py-2" />
            </fieldset>
            <fieldset className="flex gap-3">
              <input type="submit" value="Send Data" className="px-6 py-4 text-center rounded-md text-white bg-blue-700 cursor-pointer" />
              <Button buttonName="Close form" buttonColor="red" eventFunction={closeForm} />
            </fieldset>
          </fieldset>
        </form>
      </article>
    </section>
  );
}

export default AssignmentManagerForm;