import { NavLink } from "react-router-dom";
import "./Menu.css";
import HomeIcon from '@mui/icons-material/Home';
export function Menu() {

    return (
        <div className="Menu">

            <div className="home-label">
                <NavLink to="/home">
                    <HomeIcon className="nav-link" />
                    <span>Home</span>
                </NavLink>
            </div>

        </div>
    );
}
