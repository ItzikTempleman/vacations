import { NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import "./Header.css";
import { Button } from "@mui/material";
import { userService } from "../../../Services/UserService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { accountProtection } from "../../../utils/AccountProtection";
import { notify } from "../../../utils/Notify";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export function Header() {

  const user = useSelector((state: AppState) => state.user);
  const navigate = useNavigate();


  async function logout(): Promise<void> {
    notify.success(`Good bye ${user.firstName} ${user.familyName}`)
    userService.logout();
    navigate("/home");
  }

  return (
    <div className="Header">
      <div className="center-container">
        <h2>Welcome to Dream Vacations</h2>
      </div>
      <nav className="registration-container">
        {!user && (
          <>
            <NavLink to="/register">
              <PersonAddIcon className="mui-icon" />
              <span className="label">Register</span>
            </NavLink>

            <NavLink to="/login">
              <LoginIcon className="mui-icon" />
              <span className="label">Login</span>
            </NavLink>
           
          </>
        )
        }

        {user && accountProtection.isUser() && (
          <>
            <span className="user-info">
              <PermIdentityIcon />
              <h3>{user.firstName} {user.familyName} |
            {user.roleId === 1 ? " (admin)" : " (user)"}</h3>
            </span>
            
            <Button onClick={logout} >
              <LogoutIcon className="mui-icon" />
              <span className="label">Logout</span>
            </Button>
          </>
        )}
      </nav>
    </div>
  );
}
