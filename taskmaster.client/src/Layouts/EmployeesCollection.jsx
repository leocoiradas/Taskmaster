import Dashboard from "../Components/Dashboard";
import EmployeesTable from "../Components/EmployeesComponents/EmployeesTable";
import { Suspense, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getEmployees } from "../Store/Actions/EmployeesAction";
import CreateEmployeeButton from "../Components/EmployeesComponents/CreateEmployeeButton";

function EmployeesCollection(){
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(getEmployees());
    },[])

    const employees = useSelector((store) => store.employeesCollection.employees)
    console.log(employees)

    return(
        <Dashboard sectionName="Employees">
            { employees ? <EmployeesTable employeesArr={employees} /> : null }
        </Dashboard>
    )
}

export default EmployeesCollection