import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { useEffect } from "react";
import { vacationService } from "../../../Services/VacationService";
import { VacationCard } from "../VacationCard/VacationCard";

export function Home() {

    const vacations = useSelector((state: AppState) => state.vacation);
    console.log(vacations);
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
    );
}

