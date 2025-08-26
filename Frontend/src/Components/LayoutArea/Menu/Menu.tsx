import { NavLink } from "react-router-dom";
import "./Menu.css";
import HomeIcon from '@mui/icons-material/Home';
export function Menu() {

    return (
        <div className="Menu">
            <NavLink to="/home" className="nav-link">
                <HomeIcon />
                <a>Home</a>
            </NavLink>
        </div>
    );
}
