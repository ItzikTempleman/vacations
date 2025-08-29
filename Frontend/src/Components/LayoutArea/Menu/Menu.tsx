import { NavLink } from "react-router-dom";
import "./Menu.css";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import HomeIcon from '@mui/icons-material/Home';
import { UserModel } from "../../../Models/user-model/UserModel";
import { jwtDecode } from "jwt-decode";
import { Role } from "../../../Models/user-model/Role";
export function Menu() {

    function getRole(): UserModel {
        const token = localStorage.getItem("token") ?? "";
        try {
            return jwtDecode<UserModel>(token);
        } catch {
            return null;
        }
    }

    const isAdmin = function (): boolean {
        return getRole().roleId === Role.Admin;
    }

    return (
        <div className="Menu">
        <NavLink to="/home" className="nav-link">
   <div className="icon-color"> <HomeIcon /></div>
  <span className="menu-label">Home</span>
</NavLink>

<div className="divider"></div>
            {
                // isAdmin() && (
  <NavLink to="/add-vacation" className="nav-link">
    <div className="icon-color"> <BeachAccessIcon/></div>
  
  <span className="menu-label">New</span>
</NavLink>
                // )
            }
        </div>
    );
}


