import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { useEffect } from "react";
import { vacationService } from "../../../Services/VacationService";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Home.css";
import { useTitle } from "../../../utils/UseTitle";

export function Home() {
    useTitle("Home");
    const user = useSelector((state: AppState) => state.user);

    const vacations = useSelector((state: AppState) => state.vacation);
    if (!vacations) return;

    useEffect(() => {
        vacationService.getAllVacations();
    }, []);

    return (
        <div className="Home">
            
            <div className="home-header">
                <h2>Listed vacations</h2>
            </div>

            {!user && (
                <div className="no-vacations-text">
                    <h2>You must log in to view vacation offerings</h2>
                </div>
            )}

            <div className="vacation-list">
                {vacations.map(v => (
                    <VacationCard key={v.id} vacation={v} />
                ))}
            </div>
        </div>
    );
}
