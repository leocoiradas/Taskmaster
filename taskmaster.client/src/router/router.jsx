import { createBrowserRouter } from "react-router-dom";
import AssignmentCollection from "../Layouts/AssignmentCollection";
import WelcomeHomepage from "../Layouts/WelcomeHomepage";
import Layout from "../Layouts/Layout";
import AssignmentsByEmployee from "../Layouts/AssignmentsByEmployee";
import EmployeesCollection from "../Layouts/EmployeesCollection";
import LoginForm from "../Components/UserSessionsComponents/LoginForm";
import RegistrationForm from "../Components/UserSessionsComponents/RegistrationForm";
import ProtectedRoute from "./ProtectedRoute";
import RedirectEmployee from "./RedirectEmployee";
import ApplicationView from "../Layouts/ApplicationView";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ApplicationView />,
        children: [
            {
                path: "/",
                element: <WelcomeHomepage />,
            },
            {
                path: "/login",
                element: <RedirectEmployee path="/dashboard">
                    <LoginForm />
                </RedirectEmployee>
            },
            {
                path: "/register",
                element: <RedirectEmployee path="/dashboard">
                    <RegistrationForm />
                </RedirectEmployee>
            },
            {
                path: "/dashboard",
                element: <ProtectedRoute path="/login"><Layout /></ProtectedRoute>,
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
            }
        ]
    }

])

