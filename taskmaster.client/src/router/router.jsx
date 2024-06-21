import { createBrowserRouter } from "react-router-dom";
import AssignmentCollection from "../Layouts/AssignmentCollection";
import WelcomeHomepage from "../Layouts/WelcomeHomepage";
import Layout from "../Layouts/Layout";
import AssignmentsByEmployee from "../Layouts/AssignmentsByEmployee";
import EmployeesCollection from "../Layouts/EmployeesCollection";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <WelcomeHomepage />
    },
    {
        path: "/dashboard",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <AssignmentCollection />

            },
            {
                path: "myAssignments",
                element: <AssignmentsByEmployee />
            },
            {
                path: "/dashboard/employees",
                element: <EmployeesCollection />
            }
        ]
    }])

