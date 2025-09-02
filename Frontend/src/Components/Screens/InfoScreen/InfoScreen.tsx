import { Button, } from "@mui/material";
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
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { Role } from "../../../Models/user-model/Role";

export function InfoScreen() {
    useTitle("Info");
    const params = useParams();
    const vacationId = Number(params.id);
    const navigate = useNavigate();
    const [vacation, setVacation] = useState<VacationModel| null>(null);
    const user = useSelector((s: AppState) => s.user);
    const isAdmin = !!user && user.roleId === Role.Admin;
    useEffect(() => {
        if (!vacationId) {
            navigate("/home");
            return;
        };
        vacationService.getOneVacation(vacationId)
            .then(dbVacation => setVacation(dbVacation))
            .catch(err => notify.error(err));
       },[vacationId]
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
  <div className="top-section">
    <Button className="back-btn" variant="contained" onClick={returnToHome}>
      <ArrowBackIosIcon />
      Back
    </Button>

</div>
  <div className="main-container">
    <div className="image-div">
      <img src={vacation.imageUrl}  />
    </div>
    <div className="dates">
      {formatDate(vacation.departureDate)} — {formatDate(vacation.returnDate)}
    </div>
    <div className="title">
      <h2>{vacation.destination}</h2>
{
  isAdmin &&(
    <div className="edit-and-delete">
      <NavLink to={`/vacations/edit/${vacationId}`}>
        <EditNoteIcon className="edit" fontSize="large" />
      </NavLink>
      <NavLink to={"#"} onClick={() => deleteVacation()}>
        <DeleteIcon className="delete" fontSize="large" />
      </NavLink>
    </div>
  )
}
 </div>
        <Button className="price-btn" variant="contained">
   {vacation.price} $
    </Button>
    <div className="content"><p>{vacation.description}</p></div>
    </div>
</div>
  );
}
