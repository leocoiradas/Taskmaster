import Button from "../Button";
import { useDispatch } from "react-redux";
import { createEmployee, editEmployee } from "../../Store/Actions/EmployeesAction";
import Joi from 'joi';
import { useForm } from "react-hook-form";
import { joiResolver } from '@hookform/resolvers/joi';

function EmployeeManagerForm({ employeeDetails, closeForm }) {

    const dispatch = useDispatch();

    const schema = Joi.object({
        name: Joi.string().trim().required().min(2).messages({
            "string.base": "* Name should be of type text.",
            "string.empty": "* Please insert the name of the employee.",
            "string.min": "Name should be longer than 2 characters.",
            "any.required": "* Name is required."
        }),
        lastName: Joi.string().trim().required().messages({
            "string.base": "* Last name should be of type text.",
            "string.empty": "* Please insert the last name of the employee.",
            "string.min": "Last name should have at least 2 characters.",
            "any.required": "* Last name is required."
        }),
        email: Joi.string().email({ tlds: { allow: false } }).required().pattern(new RegExp("/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/")).messages({
            "string.base": "* Please type a valid email",
            "string.empty": "* Set your email in the field below.",
            "any.required": "* Email is required."
        }),
        role: Joi.string().trim().required()
    })

    const { register, handleSubmit, formState: { errors }, watch } = useForm({
        resolver: joiResolver(schema),
        defaultValues: employeeDetails?
            {
                name: employeeDetails.name,
                lastName: employeeDetails.lastName,
                email: employeeDetails.email,
                role: employeeDetails.role,
                password: process.env.SECRET

            } :
            {
                name: "",
                lastName: "",
                email: "",
                role: "Employee",
                password: process.env.SECRET

            }
    });

    const submitData = handleSubmit((data) => {
        employeeDetails ? dispatch(editEmployee(data)) : dispatch(createEmployee(data));
        alert("Employee created");
        window.location.reload(false)
    });
//--------------------------------------------------------

    return (
        <section className="w-screen h-screen flex justify-center items-center p-3 fixed inset-0 z-50 bg-gray-500/50">
            <form onSubmit={submitData} className="w-1/2 flex flex-col justify-center items-center p-3 gap-3 text-xl bg-white rounded-md shadow-md border-2 border-slate-600">
                <fieldset className="w-full flex flex-col gap-4">
                    <legend className="font-semibold text-center text-2xl">{employeeDetails ? "Edit employee data" : "Create Employee"}</legend>
                    <fieldset className="w-full">
                        <label htmlFor="firstName" className="inline font-semibold">Name</label> {errors.name && <p className="inline text-right text-lg text-red-600">{errors.name?.message}</p>}
                        <input {...register("name")} className="w-full p-2 border-2 rounded-md border-black"  />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="lastName" className="font-semibold">Last Name</label> {errors.lastName && <p className="inline text-right text-lg text-red-600">{errors.lastName?.message}</p>}
                        <input {...register("lastName")} className="w-full p-2 border-2 rounded-md border-black"  />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="email" className="font-semibold">Email</label> {errors.email && <p className="inline text-right text-lg text-red-600">{errors.email?.message}</p>}
                        <input {...register("email")} className="w-full p-2 border-2 rounded-md border-black"  />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="role" className="font-semibold">Role</label> {errors.role && <p className="inline text-right text-lg text-red-600">{errors.role?.message}</p>}
                        <div className="flex gap-3 p-1">
                            <label><input type="radio" {...register("role")} value="Admin" checked={watch("role") === "Admin"}  /> Admin</label>
                            <label><input type="radio" {...register("role")} value="Employee" checked={watch("role") === "Employee"} /> Employee</label>
                        </div>
                    </fieldset>
                    <div className="flex gap-3">
                        <input type="submit" value="Send Data" className="px-6 py-4 text-center rounded-md text-white bg-blue-700 cursor-pointer" />
                        <Button buttonName="Close form" buttonColor="red" eventFunction={closeForm} />
                    </div>
                </fieldset>
            </form>

        </section>
    );
}

export default EmployeeManagerForm;