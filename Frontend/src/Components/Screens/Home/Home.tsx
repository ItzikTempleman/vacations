import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { useEffect } from "react";
import { vacationService } from "../../../Services/VacationService";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Home.css";
import { useTitle } from "../../../utils/UseTitle";

export function Home() {
    useTitle("Home");
    const vacations = useSelector((state: AppState) => state.vacation);
    if (!vacations) return null;

    useEffect(() => {
        vacationService.getAllVacations();
    }, []
    );

    return (
        <div className="Home">
            {
                vacations.map(
                    v => <VacationCard key={v.id} vacation={v} />
                )
            }
        </div>
    )
}