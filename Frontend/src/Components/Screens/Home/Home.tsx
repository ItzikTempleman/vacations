import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { useEffect } from "react";
import { vacationService } from "../../../Services/VacationService";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Home.css";
import { useTitle } from "../../../utils/UseTitle";
import { homeParagraph } from "../../../utils/HomeParagraph";

export function Home() {
    useTitle("Home");
    const user = useSelector((state: AppState) => state.user);

    const vacations = useSelector((state: AppState) => state.vacation);
    if (!vacations) return;

    useEffect(() => {
        vacationService.getAllVacations();
    }, []);

    return (
        <div className={`Home ${user ? "logged-in" : "logged-out"}`}>
            {user && (

                <div className="home-header">
                    {
                        vacations ? <h2>Listed vacations</h2> : <h2>No vacations</h2>
                    }


                </div>

            )
            }

            {!user && (
<div className="non-logged-in-home-screen">
  <div className="home-description">
    <strong className="home-intro">
      Welcome to my vacation website, your starting point for discovering unforgettable journeys.
    </strong>
    <br className="tight-break" />
    {homeParagraph.vacationDescription()}
  </div>

  <div className="login-text">
    <h2>You must log in to view vacation offerings</h2>
  </div>
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
