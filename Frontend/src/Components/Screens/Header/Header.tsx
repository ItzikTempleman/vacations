import { NavLink } from "react-router-dom";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import "./Header.css";
import { userService } from "../../../Services/UserService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { accountProtection } from "../../../utils/AccountProtection";
import { notify } from "../../../utils/Notify";
import { Role } from "../../../Models/user-model/Role";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { downloadLikesCsv } from "../../../utils/csv";
import { useEffect, useState } from "react";
import { vacationService } from "../../../Services/VacationService";

export function Header() {

  const user = useSelector((state: AppState) => state.user);
  
  const vacations = useSelector((s: AppState) => s.vacation) as Array<{ id:number; destination:string }>;
  const [likes, setLikes] = useState<Record<number, number>>({});

  useEffect(() => {
    (async () => {
      const pairs = await Promise.all(vacations.map(v => vacationService.getLikesCount(v.id).then(c => [v.id, c] as const)));
      setLikes(Object.fromEntries(pairs));
    })();
  }, [vacations]);

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
          <HomeOutlinedIcon />
          <div className="left-link-text">Home</div>
        </NavLink>

        {isAdmin && (
          <>
            <NavLink to="/add-vacation" className="left-link">
              <AddIcon />
              <div className="left-link-text">Add vacation</div>
            </NavLink>

            <NavLink to="/report" className="left-link">
              <div className="chart-div" >
                <BarChartIcon />
                <div className="chart-div-text">Reports</div>
              </div>
            </NavLink>

           <NavLink onClick={() => downloadLikesCsv(vacations, likes)} to=" " className="left-link">
              <div className="csv-div" >
                <ArrowDownwardIcon />
                <div className="csv-div-text">CSV</div>
              </div>
            </NavLink>
          </>
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