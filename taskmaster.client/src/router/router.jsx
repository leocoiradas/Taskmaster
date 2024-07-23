import { createBrowserRouter } from "react-router-dom";
import AssignmentCollection from "../Layouts/AssignmentCollection";
import WelcomeHomepage from "../Layouts/WelcomeHomepage";
import Layout from "../Layouts/Layout";
import AssignmentsByEmployee from "../Layouts/AssignmentsByEmployee";
import EmployeesCollection from "../Layouts/EmployeesCollection";
import LoginForm from "../Components/UserSessionsComponents/LoginForm";
import RegistrationForm from "../Components/UserSessionsComponents/RegistrationForm";

export const router = createBrowserRouter([
    {
        path: "",
        element: <WelcomeHomepage />,
    },
    {
        path: "/login",
        element: <LoginForm />
    },
    {
        path: "/register",
        element: <RegistrationForm />
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

