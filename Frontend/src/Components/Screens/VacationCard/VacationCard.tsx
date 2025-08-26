import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import FavoriteIcon from '@mui/icons-material/Favorite';
type VacationProps = {
    vacation: VacationModel;
}
export function VacationCard({ vacation }: VacationProps) {

    function formatDate(input: string): string {
        const date = new Date(input);

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // months are 0-based
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
<div className="like-icon"><FavoriteBorderTwoToneIcon/></div>
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
