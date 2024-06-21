import EmployeeManagerForm from "./EmployeeManagerForm";
import { useState } from "react";
import Button from "../Button";

function EmployeesTable({ employeesArr }) {
  const [formVisibility, setFormVisibility] = useState(false);
  const [formDetails, setFormDetails] = useState({
    name: "",
    lastName: "",
    email: "",
    role: ""
  })

  const showForm = () => {
    setFormVisibility(!formVisibility)
  }
  const employeeFormDetails = (employeeDetails) => {
    setFormDetails({
      name: employeeDetails.name,
      lastName: employeeDetails.lastName,
      email: employeeDetails.email,
      role: employeeDetails.role
    })
    console.log(formDetails)
    setFormVisibility(!formVisibility)
  }
  return (
    <>
      <table className="w-full h-full">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Lastname</th>
            <th>Email</th>
            <th>Role</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {employeesArr.map((employee) => (
            <tr className="text-center">
              <td>{employee.employeeId}</td>
              <td>{employee.name}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td><Button buttonName="Edit" buttonColor="blue" eventFunction={() => employeeFormDetails(employee)} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      {formVisibility ? <EmployeeManagerForm employeeDetails={formDetails} closeForm={showForm}/> : null}
    </>
  );
}

export default EmployeesTable;