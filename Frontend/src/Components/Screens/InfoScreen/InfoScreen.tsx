import { Button, } from "@mui/material";
import { useTitle } from "../../../utils/UseTitle";
import "./InfoScreen.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { VacationModel } from "../../../Models/VacationModel";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../utils/Notify";
import { appConfig } from "../../../utils/AppConfig";


export function InfoScreen() {
  useTitle("Info");
  const params = useParams();
  const vacationId = Number(params.id);
  const navigate = useNavigate();
  const [vacation, setVacation] = useState<VacationModel | null>(null);

//const [imgSrc, setImgSrc] = useState<string>(vacation.imageUrl || appConfig.noImage);
  useEffect(() => {


    if (!vacationId) {
      navigate("/home");
      return;
    };
    // setImgSrc(vacation.imageUrl && vacation.imageUrl.trim() !== "" ? vacation.imageUrl : appConfig.noImage);
    vacationService.getOneVacation(vacationId)
      .then(dbVacation => setVacation(dbVacation))
      .catch(err => notify.error(err));
  }, [vacationId]
  );

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



  if (!vacation) return null;

  return (
    <div className="InfoScreen">
      <div className="top-section">
        <Button className="back-btn" variant="contained" onClick={returnToHome}>
          <ArrowBackIosIcon />
          Back
        </Button>

      </div>
      <div className="main-container">
        <div className="image-div">
          <img src={imgSrc} />
        </div>
        <h2 className="dates">
          {formatDate(vacation.departureDate)} — {formatDate(vacation.returnDate)}
        </h2>


        
        <div className="title">
          <h2>{vacation.destination}</h2>
          <h2 className="price-container">
            {vacation.price} $
          </h2>
        </div>
        <div className="content"><p>{vacation.description}</p></div>

      </div>
    </div>
  );
}
