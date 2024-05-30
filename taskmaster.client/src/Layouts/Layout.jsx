import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";

function Layout(){
    
    return (
        <>
            <Header />
            <div className="flex max-h-[90dvh]">
                
                <Navbar />
                <Outlet />
                
                
            </div>
        </>
    )
}

export default Layout;