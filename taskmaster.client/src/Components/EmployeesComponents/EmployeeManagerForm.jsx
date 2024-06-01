import { useState } from "react";
import Button from "../Button";
import { useDispatch } from "react-redux";
import { createEmployee, editEmployee } from "../../Store/Actions/EmployeesAction";

function EmployeeManagerForm(employeeDetails) {

    const dispatch = useDispatch()

    const [employeeFormData, setemployeeFormData] = useState({
        name: "",
        lastName: "",
        email: "",
        role: ""
    })

    useEffect(() => {
        employeeData(employeeFormData);
    }, [employeeFormData])

    const employeeData = () => {
        if (employeeFormData) {
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
            <section className="w-full h-full flex justify-center items-center p-3">
                <form action="" method="post">
                    <label htmlFor="firstName">Name</label>
                    <input name="firstName" onChange={formData} />
                    <label htmlFor="lastName">Last Name</label>
                    <input name="lastName" onChange={formData} />
                    <label htmlFor="email">Email</label>
                    <input name="email" onChange={formData} />
                    <label htmlFor="role">Role</label>
                    <select name="role" onChange={formData} >
                        <option value="employee" selected>Employee</option>
                        <option value="admin">Admin</option>
                    </select>
                    <div>
                        <Button buttonName="Send data" buttonColor="blue" eventFunction={employeeDetails ? editemployeeFormData : createemployeeFormData} />
                        <Button buttonName="Close form" buttonColor="red" eventFunction={closeForm} />
                    </div>
                </form>

            </section>
        );
    }
}

export default EmployeeManagerForm;