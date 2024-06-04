import { useState, useEffect } from "react";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { createEmployee, editEmployee } from "../../Store/Actions/EmployeesAction";

function EmployeeManagerForm({ employeeDetails, closeForm }) {

    const dispatch = useDispatch()

    const [employeeFormData, setemployeeFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        role: "Employee"
    })

    useEffect(() => {
        employeeData(employeeFormData);
    }, [employeeDetails])
    

    const employeeData = () => {
        if (employeeDetails) {
            setemployeeFormData({
                name: employeeDetails.name,
                lastName: employeeDetails.lastName,
                email: employeeDetails.email,
                role: employeeDetails.role
            });


        } else {
            setemployeeFormData({
                name: "",
                lastName: "",
                email: "",
                role: ""
            })
        }

    }

        const formData = (event) => {
            setemployeeFormData({
                ...employeeFormData,
                [event.target.name]: event.target.value
            })
        }

        const createemployeeFormData = () => {
            dispatch(createEmployee)
        }

        const editemployeeFormData = () => {
            dispatch(editEmployee)
        }

        return (
            <section className="w-screen h-screen flex justify-center items-center p-3 fixed inset-0 z-50 bg-gray-500/50">
                <form action="" method={employeeDetails ? "put" : "post"} className="w-1/2 flex flex-col justify-center items-start p-3 gap-3 text-xl bg-white rounded-md">
                    <label htmlFor="firstName" className="font-semibold">Name</label>
                    <input name="firstName" onChange={formData} value={employeeFormData.name} className="w-full p-2 border-2 rounded-md border-black" />
                    <label htmlFor="lastName" className="font-semibold">Last Name</label>
                    <input name="lastName" onChange={formData} value={employeeFormData.lastName} className="w-full p-2 border-2 rounded-md border-black" />
                    <label htmlFor="email" className="font-semibold">Email</label>
                    <input name="email" onChange={formData} value={employeeFormData.email} className="w-full p-2 border-2 rounded-md border-black" />
                    <label htmlFor="role" className="font-semibold">Role</label>
                    <div className="flex gap-3">
                        <label><input type="radio" name="role" value="Admin" checked= {employeeFormData.role === "Admin"} /> Admin</label>
                        <label><input type="radio" name="role"  value="Employee" checked= {employeeFormData.role === "Employee"} /> Employee</label>
                    </div>
                    <div className="flex gap-3">
                        <Button buttonName="Send data" buttonColor="blue" eventFunction={employeeDetails ? editemployeeFormData : createemployeeFormData} />
                        <Button buttonName="Close form" buttonColor="red" eventFunction={closeForm} />
                    </div>
                </form>

            </section>
        );
    }

export default EmployeeManagerForm;