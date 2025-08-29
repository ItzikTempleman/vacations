import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import "./VacationCard.css";
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import FavoriteBorderTwoToneIcon from '@mui/icons-material/FavoriteBorderTwoTone';
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../utils/Notify";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/Store";

type VacationProps = {
    vacation: VacationModel;
}
export function VacationCard({ vacation }: VacationProps) {
    const userId = useSelector((thisUser: AppState) => thisUser.user.id);
    const vacationId = vacation.id;

    let key = "";
    if (userId) {
        key = `${userId}, ${vacationId}`
    }


    //reading likes count
    const [likes, readLikesState] = useState<number>(0);

    //manage toggling
    const [liked, setLiked] = useState<boolean>(false);


    useEffect(
        () => {
            vacationService.getLikesCount(vacation.id)
                .then((count) => {
                    readLikesState(count ?? 0)
                }
                )
                .catch(() => readLikesState(0));

            setLiked(!!(key&& localStorage.getItem(key)))
        }, [vacation.id]
    );


    async function toggleLike() {
        try {
            if (liked) {
                await vacationService.unlikeVacation(vacation.id);
                setLiked(false);
                readLikesState((prevLikes) => Math.max(0, prevLikes - 1));
                if(key) localStorage.removeItem(key);
            } else {
                await vacationService.likeVacation(vacation.id!);
                setLiked(true);
                readLikesState((likeCount) => likeCount + 1);
                if(key) localStorage.setItem(key, "1");
            }
        }
        catch (err: any) {
            notify.error(err.message);
        };
    }


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
                <div className="like-icon" onClick={toggleLike}>
                    {liked ? <FavoriteIcon /> : <FavoriteBorderTwoToneIcon />}
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
