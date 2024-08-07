import { Link } from "react-router-dom";
import { GrNotes } from "react-icons/gr";
import { FaUser } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import LogoutButton from "./LogoutButton";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";


function Navbar() {
    const navLinks = [
        {
            name: "Assignments",
            section: "/dashboard",
            icon: <GrNotes />

        }, 
        {
            name: "My Assignments",
            section: "",
            icon: <FaUser />
        },
        {
            name: "Employees",
            section: "/dashboard/employees",
            icon: <TiGroup />
        }
        
    ]

    let userData = JSON.parse(Cookies.get("user"))
    let userName = userData.name + " " + userData.lastName

    return (
        <div className="w-[25dvw] h-[90dvh] flex flex-col justify-between p-4 gap-3 border-r-4 border-zinc-600">
            <h2>Welcome {userName}!</h2>
            <nav className="flex flex-col justify-center">
                    <ul className="h-[60dvh] w-full flex flex-col justify-end gap-3 text-xl">
                        {navLinks.map((element) => (
                            <li key={element} className="p-2 border-2 rounded-md border-black text-black hover:bg-blue-600 hover:text-white hover:border-white">
                                <Link to={element.section} className="w-full justify-start items-baseline flex gap-3">{element.icon} {element.name}</Link>
                            </li>)
                        )
                        }
                        <li><LogoutButton /></li>
                    </ul>
            </nav>
        </div>
    );
}

export default Navbar;