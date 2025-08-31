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
    const navigate= useNavigate();
  const { id } = useParams<{ id: string }>();
  const [vacation, setVacation] = useState<VacationModel | null>(null);


    useEffect(() => {
    if (!id) { navigate("/home"); return; }
     vacationService.getOneVacation(+id)
      .then(setVacation)
      .catch(() => navigate("/home"));
  }, [id, navigate]);

  
  if (!vacation) return null;
    function formatDate(input: string): string {
        const date = new Date(input);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    function returnToHome(){
        navigate("/home");
    }

    return (
        <div className="InfoScreen">

            <div>
                <img src={vacation.imageUrl} />
            </div>

            <div>
                <p>{vacation.destination}</p>
            </div>

            <div>
                <CalendarMonthIcon />
                <span>{formatDate(vacation.departureDate)} - {formatDate(vacation.returnDate)}</span>
            </div>

            <div>
                <p>{vacation.description}</p>
           <div>
                    <Button variant="contained" onClick={returnToHome}><ArrowBackIosIcon />Back</Button>
                </div>
                <div>
                    <h2>{vacation.price}</h2>
                </div>
            </div>
        </div>
    );
}
