import { Button, IconButton } from "@mui/material";
import { useTitle } from "../../../utils/UseTitle";
import "./InfoScreen.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { VacationModel } from "../../../Models/VacationModel";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { vacationService } from "../../../Services/VacationService";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';
import { notify } from "../../../utils/Notify";

export function InfoScreen() {
    useTitle("Info");
    const params = useParams();
    const vacationId = Number(params.id);
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel| null>(null);

    useEffect(() => {
        if (!vacationId) {
            navigate("/home");
            return;
        };
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

    async function deleteVacation() {
        try {
            const areYouSure = confirm("Remove this vacation?")
            if (!areYouSure) return
            await vacationService.deleteVacation(vacationId)
            notify.success("Vacation removed")
            navigate("/home")
        } catch (err: unknown) {
            notify.error(err);
        }
    }

    if (!vacation) return null;

    return (
<div className="InfoScreen">
  <div className="header">
    <Button className="back-btn" variant="contained" onClick={returnToHome}>
      <ArrowBackIosIcon sx={{ fontSize: 16 }} />
      Back
    </Button>

    <div className="actions">
      <NavLink to={`/vacations/edit/${vacationId}`}>
        <EditNoteIcon />
      </NavLink>
      <span>|</span>
      <NavLink to={"#"} onClick={() => deleteVacation()}>
        <DeleteIcon />
      </NavLink>
    </div>
  </div>

  <div className="media">
    <div className="frame">
      <img src={vacation.imageUrl} alt={vacation.destination} />
    </div>
    <div className="dates">
      {formatDate(vacation.departureDate)} — {formatDate(vacation.returnDate)}
    </div>
  </div>

  <div className="content">
    <div className="title-price">
      <h1>{vacation.destination}</h1>
      <div className="price">{vacation.price} $</div>
    </div>
    <p>{vacation.description}</p>
  </div>
</div>

  );
}
