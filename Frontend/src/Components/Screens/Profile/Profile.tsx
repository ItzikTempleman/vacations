import { useSelector } from "react-redux";
import { useTitle } from "../../../utils/UseTitle";
import "./Profile.css";
import { AppState } from "../../../Redux/Store";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';

export function Profile() {
    useTitle("Profile");

     const user = useSelector((state: AppState) => state.user);
     if (!user) return null;
    
  return (
    <div className="Profile" aria-label="User profile">
      <PermIdentityIcon className="icon" fontSize="large" />
      <div className="name">
        <h3>{user.firstName} {user.familyName}</h3>
      </div>
      <div className="role">
        <p>{user.roleId === 1 ? "Admin" : "Regular user"}</p>
      </div>
    </div>
  );
}