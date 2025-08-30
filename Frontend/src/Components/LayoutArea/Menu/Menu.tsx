import { NavLink } from "react-router-dom";
import "./Menu.css";
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
import HomeIcon from '@mui/icons-material/Home';
import { Role } from "../../../Models/user-model/Role";
import { AppState } from "../../../Redux/Store";
import { useSelector } from "react-redux";
export function Menu() {

  const user = useSelector((s: AppState) => s.user);
  const isAdmin = !!user && user.roleId === Role.Admin;

    return (
        <div className="Menu">
            <NavLink to="/home" className="nav-link">
                <div className="icon-color"><HomeIcon/></div>
                <span className="menu-label">Home</span>
            </NavLink>
            {
                isAdmin  && (
                    <NavLink to="/add-vacation" className="nav-link">
                        <div className="icon-color"><BeachAccessIcon/></div>
                        <span className="menu-label">New</span>
                    </NavLink>
                )
            }
        </div>
    );
}


