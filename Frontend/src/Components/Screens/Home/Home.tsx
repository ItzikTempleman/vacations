import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";
import { useEffect, useState } from "react";
import { vacationService } from "../../../Services/VacationService";
import { VacationCard } from "../VacationCard/VacationCard";
import "./Home.css";
import { useTitle } from "../../../utils/UseTitle";
import { homeParagraph } from "../../../utils/HomeParagraph";
import ReactPaginate from "react-paginate";

export function Home() {
    useTitle("Home");
    const user = useSelector((state: AppState) => state.user);

    const vacations = useSelector((state: AppState) => state.vacation);
   

    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        vacationService.getAllVacations();
    }, []
    );

    if (!vacations) return null;

    //Math.ceil rounds it upwards
    const pageCount = Math.ceil(vacations.length / 9);
    const start = currentPage * 9;
    const end = start + 9;
    const currentItems = vacations.slice(start, end);

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
            )
            }

            <div className="vacation-list">
                {currentItems.map(v => (
                    <VacationCard key={v.id} vacation={v} />
                )
                )
                }
            </div>

            {pageCount > 1 && (
                <div className="pagination-container">
                    <ReactPaginate
                        breakLabel="..."
                        nextLabel="➡️"
                        previousLabel="⬅️"
                        onPageChange={({ selected }) => {
                            setCurrentPage(selected);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        pageCount={pageCount}
                        forcePage={currentPage}
                        containerClassName="pagination"
                        activeClassName="pagination-active"
                        renderOnZeroPageCount={null}
                    />
                </div>
            )}
        </div>
    );
}
