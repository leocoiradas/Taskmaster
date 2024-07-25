import { GiPowerButton } from "react-icons/gi";

function LogoutButton(){
    return (
        <button onClick={console.log("funciona")} className="w-full flex justify-start items-baseline text-black border-2 border-black rounded-md hover:bg-red-500 hover:border-white hover:text-white gap-3 p-2">
            <GiPowerButton /> Logout
        </button>
    )
}

export default LogoutButton;