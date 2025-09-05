import { NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import "./Header.css";
import { Button } from "@mui/material";
import { userService } from "../../../Services/UserService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { accountProtection } from "../../../utils/AccountProtection";
import { notify } from "../../../utils/Notify";
import PersonIcon from '@mui/icons-material/Person';
import { Role } from "../../../Models/user-model/Role";
import HomeIcon from '@mui/icons-material/Home';

import AddIcon from '@mui/icons-material/Add';

export function Header() {

  const user = useSelector((state: AppState) => state.user);

  const isAdmin = !!user && user.roleId === Role.Admin;

  async function logout(): Promise<void> {
    notify.success(`Good bye ${user.firstName} ${user.familyName}`)
    userService.logout();
  }

  return (
    <div className="Header">
 
      <div className="header-brand">
        <h3>Vacations</h3>
    

        <NavLink to="/home" className="left-link">
          <HomeIcon />
          <div className="left-link-text">Home</div>
        </NavLink>

        {isAdmin && (
          <NavLink to="/add-vacation" className="left-link">
            <AddIcon />
            <div className="left-link-text">Add vacation</div>
          </NavLink>
        )}

  </div>



      <div className="header-account" >
        {!user && (
          <NavLink to="/login" className="login-logout-container">
            <LoginIcon />
            <p className="login-label">Login</p>
          </NavLink>
        )}

        {user && accountProtection.isUser() && (
          <>
            <span className="header-user">
              <span className="header-user-name">
                <PersonIcon fontSize="small" />
                {user.firstName} {user.familyName}
              </span>
              <span className={`header-role ${user.roleId === 1 ? "header-role-admin" : ""}`}>
                {user.roleId === 1 ? "Admin" : "User"}
              </span>
            </span>

        <NavLink to="/login" className="login-logout-container" onClick={logout}  >
            <LogoutIcon />
            <p className="logout-label">Logout</p>
          </NavLink>
          </>
        )}
      </div>
    </div>
  );
}