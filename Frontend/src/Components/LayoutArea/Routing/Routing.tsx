import { Navigate, Route, Routes } from "react-router-dom";
import { Home } from "../../Screens/Home/Home";
import { Page404 } from "../Page404/Page404";
import { RegisterUser } from "../../Screens/RegisterUser/RegisterUser";
import { LoginScreen } from "../../Screens/LoginScreen/LoginScreen";
import { Profile } from "../../Screens/Profile/Profile";

export function Routing() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Page404 />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </div>
    );
}
