import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
function Layout(){
    return <div>
        <Navbar/>
        <div className="layout-content">
            <Outlet />
        </div>
    </div>
}
export default Layout;