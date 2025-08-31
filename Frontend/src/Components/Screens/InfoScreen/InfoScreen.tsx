import { Button } from "@mui/material";
import { useTitle } from "../../../utils/UseTitle";
import "./InfoScreen.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { AppState } from "../../../Redux/Store";
import { useSelector } from "react-redux";
import { VacationModel } from "../../../Models/VacationModel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { vacationService } from "../../../Services/VacationService";



export function InfoScreen() {
    useTitle("Info");
    const user = useSelector((state: AppState) => state.user);
    const params = useParams();
    const vacationId = Number(params.id);
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel>();

    useEffect(() => {
        if (!vacationId) {
            navigate("/home");
            return;
        };
        vacationService.getOneVacation(vacationId)
            .then(dbVacation => setVacation(dbVacation))
            .catch(() => navigate("/home"));
    }, [vacationId]
    );


    if (!vacation) return null;
    function formatDate(input: string): string {
        const date = new Date(input);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function returnToHome() {
        navigate("/home");
    }

    return (
        <div className="InfoScreen">
            <Button className="back-btn" variant="contained" onClick={returnToHome}><ArrowBackIosIcon />Back</Button>

            <div className="vacation-image-container">
                <img src={vacation.imageUrl}/>
                <div className="dates">
                    <h2 >{formatDate(vacation.departureDate)} - {formatDate(vacation.returnDate)}</h2>
                </div>
            </div>

            <div className="title-and-price">
                <h1 className="vacation-title">{vacation.destination}</h1>
                <h3 className="info-price">{vacation.price} $</h3>
            </div>

            <div>
                <p>{vacation.description}</p>
            </div>
        </div>
    );
}
