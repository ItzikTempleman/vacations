import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import { vacationService } from "../../../Services/VacationService";

type VacationProps = {
    vacation: VacationModel;
}
export function VacationCard({ vacation }: VacationProps) {

    const [likes, setLikes] = useState<number | null>(null);

    useEffect(
        () => {
            vacationService.getLikesCount(vacation.id)
                .then((count) => {
                    setLikes(count)
                    console.log("likes: "+ count)
                }
                )
                .catch(() => setLikes(0));
        }, [vacation.id]
    );

    function formatDate(input: string): string {
        const date = new Date(input);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    return (
        <div className="VacationCard">

            <div className="image-container">

                <img src={vacation.imageUrl} />
                <div className="destination-card">
                    <p className="vacation-destination">{vacation.destination}</p>
                </div>
            </div>
            <div className="vacation-dates">
                <CalendarMonthIcon className="calendar-icon" />
                <span>{formatDate(vacation.departureDate)} - {formatDate(vacation.returnDate)}</span>
                <div className="like-icon">
                    <FavoriteBorderTwoToneIcon />
                </div>
                <span>{likes}</span>
            </div>

            <div className="vacation-content">
                <p className="vacation-description">{vacation.description}</p>
                <div className="vacation-price">
                    <h2>{vacation.price}₪</h2>
                </div>

            </div>

        </div>
    );
}
