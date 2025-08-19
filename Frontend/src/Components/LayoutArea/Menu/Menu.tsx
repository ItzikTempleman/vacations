import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu() {

    return (
        <div className="Menu">
            <NavLink to="/home" className="nav-link">Home</NavLink>
    
        </div>
    );
}
