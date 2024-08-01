import { GiPowerButton } from "react-icons/gi";
import { useDispatch } from "react-redux";
import { userLogout } from "../Store/Actions/LoginActions";

function LogoutButton(){
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(userLogout())
    }
    return (
        <button onClick={logout} className="w-full flex justify-start items-baseline text-black border-2 border-black rounded-md hover:bg-red-500 hover:border-white hover:text-white gap-3 p-2">
            <GiPowerButton /> Logout
        </button>
    )
}

export default LogoutButton;