import { NavLink, useNavigate } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import "./Header.css";
import { Button } from "@mui/material";
import { userService } from "../../../Services/UserService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { accountProtection } from "../../../utils/AccountProtection";
import { notify } from "../../../utils/Notify";


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

      <nav className="registration-container">
        {!user && (
          <>
            <NavLink to="/register">
              <PersonAddIcon className="mui-icon" />
              <span className="label">Register</span>
            </NavLink>

            <span className="sep">|</span>

            <NavLink to="/login">
              <LoginIcon className="mui-icon" />
              <span className="label">Login</span>
            </NavLink>
             <span className="sep">|</span>
          </>
          )
        }
        {user && accountProtection.isUser() && (
          <>
            <NavLink to="/profile">
              <AccountCircleIcon className="mui-icon"/>
              <span className="label">Profile</span>
            </NavLink>
            <span className="sep">|</span>
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
