import { Button, TextField } from "@mui/material";
import { useTitle } from "../../../utils/UseTitle";
import "./EditVacation.css";
import { useEffect, useState } from "react";
import { VacationModel } from "../../../Models/VacationModel";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { vacationService } from "../../../Services/VacationService";
import { notify } from "../../../utils/Notify";
import { validateReturnAfterIsDeparture } from "../../../utils/CompareDates";

function formatDate(datetimeLocal: string): string {
    return datetimeLocal.replace("T", " ").slice(0, 16);
}

export function EditVacation() {
    useTitle("Edit");
    const [image, setImage] = useState<string>("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const { register, handleSubmit, setValue, getValues, formState: { errors } } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams()
    const id = Number(params.id);

    useEffect(() => {
        vacationService.getOneVacation(id)
            .then(dbVacation => {
                setValue("destination", dbVacation.destination);
                setValue("description", dbVacation.description);
                setValue("departureDate", formatDate(dbVacation.departureDate));
                setValue("returnDate", formatDate(dbVacation.returnDate));
                setValue("price", dbVacation.price);
                setImage(dbVacation.imageUrl || "");
            }).catch(err => notify.error(err));
    }, []);

    function cancelUpdate(): void {

        navigate("/home")
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
        } catch (err: any) {
            notify.error(err);
        }
    }

    return (
        <div className="EditVacation">

            <form onSubmit={handleSubmit(send)} className="edit-vacation-form">
                <h2 className="edit-vacation-title">Edit your vacation </h2>
                <div className="input-field">
                    <h3>Destination</h3>
                    <TextField
                        fullWidth
                        {...register("destination")} />
                </div>

                <div className="input-field">
                    <h3>Description</h3>
                    <TextField

                        className="input-field-desc"
                        multiline
                        minRows={6}
                        maxRows={6}
                        sx={{
                            "& textarea": {
                                overflowY: "auto"
                            }
                        }}
                        fullWidth
                        {...register("description")}
                    />
                </div>

                <div className="edit-input-field">
                    <div className="edit-flight-dates"><h3>Departure</h3></div>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        {...register("departureDate")}
                        error={!!errors.departureDate}
                        helperText={errors.departureDate?.message}
                    />
                </div>

                <div className="edit-input-field">
                    <div className="edit-flight-dates"><h3>Return</h3></div>
                    <TextField
                        fullWidth
                        type="datetime-local"
                        {...register("returnDate", {
                            validate: (val) => validateReturnAfterIsDeparture(getValues("departureDate"), val)
                        })
                        }
                        error={!!errors.returnDate}
                        helperText={errors.returnDate?.message}

                    />
                </div>
                <div className="price-div">
                    <h3>Price</h3>
                    <TextField
                        fullWidth
                        type="number"
                        {...register("price")} />
                </div>

                {image && <img className="image-preview" src={image} />}

                <div className="edit-image-upload-container">

                    <input
                        type="file"
                        accept="image/*"
                        {...register("image", { required: false })}
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
