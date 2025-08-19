import { NavLink } from "react-router-dom";
import "./Header.css";

export function Header() {
    return (
        <div className="Header">

            <NavLink to="/register" className="header-link">Register</NavLink>
            <NavLink to="/login" className="header-link">Login</NavLink>

        </div>
    );
}
