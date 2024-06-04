import EmployeeManagerForm from "./EmployeeManagerForm";
import { useState } from "react";
import Button from "../Button";

function EmployeesTable({ employeesArr }) {
  const [formVisibility, setFormVisibility] = useState(false);

  const showForm = () => {
    setFormVisibility(!formVisibility)
    console.log("boton")
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
              <td><Button buttonName="Edit" buttonColor="blue" eventFunction={showForm} /></td>
              <td>{formVisibility ? <EmployeeManagerForm employeeDetails={employee} closeForm={showForm}/> : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default EmployeesTable;