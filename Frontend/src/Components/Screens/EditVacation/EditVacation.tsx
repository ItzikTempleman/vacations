import { Button, TextField } from "@mui/material";
import { useTitle } from "../../../utils/UseTitle";
import "./EditVacation.css";
import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../utils/Notify";


export function EditVacation() {
    useTitle("Edit");
    const [image, setImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { register, handleSubmit, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams()
    const id = Number(params.id);

    useEffect(() => {
        vacationService.getOneVacation(id)
            .then(dbVacation => {
                setValue("destination", dbVacation.destination);
                setValue("description", dbVacation.description);
                setValue("departureDate", dbVacation.departureDate);
                setValue("returnDate", dbVacation.returnDate);
                setValue("price", dbVacation.price);
                setImage(dbVacation.imageUrl || "");
            }).catch(err => notify.error(err));
    }, []);

    function cancelUpdate(): void {
        navigate(`/vacations/edit/${id}`)
    };

    const onPick: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setSelectedFile(file);
        setImage(URL.createObjectURL(file));
        e.target.value = "";
    };

    async function send(vacation: VacationModel) {
        try {
            vacation.image = selectedFile ?? vacation.image;
            vacation.id = id;
            await vacationService.updateVacation(vacation);
            notify.success("Vacation updated");
            navigate("/home/");
        } catch (err: unknown) {
            notify.error(err);
        }
    }

    return (
        <div className="EditVacation">

            <form onSubmit={handleSubmit(send)} className="edit-vacation-form">
                <h2 className="edit-vacation-title">Edit your vacation </h2>
                <div className="input-field">
                    <h3>Edit Destination</h3>
                    <TextField
                        fullWidth
                        {...register("destination")} />
                </div>

                <div className="input-field">
                    <h3>Edit Description</h3>
                    <TextField

                        className="input-field-desc"
                        multiline
                        minRows={6}
                        fullWidth
                        {...register("description")}
                        sx={{
                            "& .MuiInputBase-inputMultiline": {
                                maxHeight: 160,
                                overflowY: "auto"
                            }
                        }} />
                </div>

                <div className="edit-input-field">
                    <div className="edit-flight-dates"><h3>Edit departure date</h3></div>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        {...register("departureDate")} />
                </div>

                <div className="edit-input-field">
                    <div className="edit-flight-dates"><h3>Edit return date</h3></div>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        {...register("returnDate")} />
                </div>
                <div>
                    <h3>Edit Price</h3>
                    <TextField
                        fullWidth
                        type="number"
                        {...register("price")} />
                </div>

                <img className="image-preview" src={image} />

                <div className="edit-image-upload-container">

                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="image-input"
                        onChange={onPick}
                    />
                </div>

                <div className="btns-div">

                    <Button className="edit-btn"
                        type="submit"
                        variant="contained">
                        Update
                    </Button>

                    <Button className="cancel-btn"
                        onClick={() => cancelUpdate()}
                        variant="contained">
                        Cancel
                    </Button>
                    
                </div>
            </form >

        </div>
    );
}
