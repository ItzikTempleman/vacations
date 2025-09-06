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
import { Button } from "@mui/material";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { NavLink, useNavigate } from "react-router-dom";
import { Role } from "../../../Models/user-model/Role";
import EditNoteIcon from '@mui/icons-material/EditNote';
import DeleteIcon from '@mui/icons-material/Delete';



type VacationProps = {
    vacation: VacationModel;
}

export function VacationCard({ vacation }: VacationProps) {
    const user = useSelector((state: AppState) => state.user);
    const vacationId = vacation.id;
    const navigate = useNavigate();
    const isAdmin = !!user && user.roleId === Role.Admin;

    let key = "";
    if (user.id) {
        key = `${user.id}, ${vacationId}`
    }


    //reading likes count
    const [likes, setLikeState] = useState<number>(0);

    //manage toggling
    const [liked, setLiked] = useState<boolean>(false);




    useEffect(
        () => {
            vacationService.getLikesCount(vacation.id)
                .then((count) => setLikeState(count ?? 0))
                .catch(() => setLikeState(0));
            setLiked(!!(key && localStorage.getItem(key)))
        }, [vacation.id]
    );

    async function moveToInfo(): Promise<void> {
        navigate("/vacations/" + vacation.id);
    }

    async function toggleLike() {
        try {
            if (liked) {
                await vacationService.unlikeVacation(vacation.id);
                setLiked(false);
                setLikeState((prevLikes) => Math.max(0, prevLikes - 1));
                if (key) localStorage.removeItem(key);
            } else {
                await vacationService.likeVacation(vacation.id!);
                setLiked(true);
                setLikeState((likeCount) => likeCount + 1);
                if (key) localStorage.setItem(key, "1");
            }
        }
        catch (err: any) {
            notify.error(err.message);
        };
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
                <div className="image-gradient" />
                <p className="destination-title">{vacation.destination}</p>
                                            {
                    isAdmin && (
                        <>
                            <div className="edit-and-delete">
                                <NavLink to={`/vacations/edit/${vacationId}`}>
                                    <EditNoteIcon className="edit" />
                                </NavLink>
                                <NavLink to={"#"} onClick={() => deleteVacation()}>
                                    <DeleteIcon className="delete" />
                                </NavLink>
                            </div>
                        </>
                    )
                }
            </div>

            <div className="vacation-dates">
                <CalendarMonthIcon className="calendar-icon" />
                <span className="dates-text">{formatDate(vacation.departureDate)} - {formatDate(vacation.returnDate)}</span>

                {
                    !isAdmin && (
                        <>
                            <div className="like-icon" onClick={toggleLike}>
                                {liked ? <FavoriteIcon /> : <FavoriteBorderTwoToneIcon />}
                            </div>
                            <span>{likes}</span>
                        </>
                    )
                }

            </div>

            <div className="vacation-content">
                <p className="vacation-description">{vacation.description}</p>
                <div>
                    <Button className="more-info-btn"
                        onClick={moveToInfo}
                        variant="contained">
                        More info
                        <ArrowForwardIosIcon />
                    </Button>
                </div>

                <div className="vacation-price">
                    <h2>{vacation.price}$</h2>
                </div>
            </div>
        </div>
    );
}
