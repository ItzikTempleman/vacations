import { NavLink } from "react-router-dom";
import "./Header.css";

export function Header() {
    return (
        <div className="Header">
<div className="title">
            <h3>Vacations</h3>
</div>
            <div className="registration-container">
                <NavLink to="/register" className="header-link">Register</NavLink>
                <NavLink to="/login" className="header-link">Login</NavLink>
            </div>
        </div>
    );
}
