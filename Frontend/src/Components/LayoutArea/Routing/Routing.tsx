import { Navigate, Route, Routes } from "react-router-dom";

import { Page404 } from "../../Screens/Page404/Page404";
import { RegisterUser } from "../../Screens/RegisterUser/RegisterUser";
import { LoginScreen } from "../../Screens/LoginScreen/LoginScreen";
import { Home } from "../../Screens/Home/Home";
import { AddVacation } from "../../Screens/AddVacation/AddVacation";
import { InfoScreen } from "../../Screens/InfoScreen/InfoScreen";



export function Routing() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Page404 />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<RegisterUser />} />
                <Route path="/login" element={<LoginScreen />} />
                <Route path="/add-vacation" element={<AddVacation/>} />
                <Route path="/vacations/:id" element={<InfoScreen />} /> {
                    
                }
            </Routes>
        </div>
    );
}
