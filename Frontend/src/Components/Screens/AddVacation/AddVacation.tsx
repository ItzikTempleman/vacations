import { useForm } from "react-hook-form";
import { VacationModel } from "../../../Models/VacationModel";
import { useTitle } from "../../../utils/UseTitle";
import "./AddVacation.css";
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import { notify } from "../../../utils/Notify";
import { vacationService } from "../../../Services/VacationService";
import { Button, TextField } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlightLandIcon from '@mui/icons-material/FlightLand';
export function AddVacation() {
    useTitle("Add vacation");
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<VacationModel>();


    async function send(vacation: VacationModel): Promise<void> {
        vacation.image = (vacation.image as unknown as FileList)[0];
        try {
            const formattedTakeOffTime = vacation.departureDate.replace("T", " ");
            vacation.departureDate = formattedTakeOffTime;
            const formattedLandingOffTime = vacation.returnDate.replace("T", " ");
            vacation.returnDate = formattedLandingOffTime;
            await vacationService.addVacation(vacation);
            notify.success("Created vacation");
            navigate("/home");
        } catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="AddVacation">
            <form onSubmit={handleSubmit(send)} className="add-vacation-form">
                <h2 className="add-vacation-title">Add a new vacation</h2>
                <div className="input-field">
                    <TextField
                    fullWidth
                        label="Destination "
                        placeholder="Where are you going?"
                        {...register("destination")}/>
                </div>

                <div className="input-field">
                    <TextField
                        className="input-field-desc"
                        label="Description"
                        multiline
                        minRows={6}
                        placeholder="Tell us about your vacation"
                        fullWidth
                        {...register("description")}
                        sx={{
                            "& .MuiInputBase-inputMultiline": {
                                maxHeight: 160,
                                overflowY: "auto"
                            }
                        }}/>
                </div>

                <div className="input-field">
                    <div className="add-flight-dates"><FlightTakeoffIcon /><h3>Departure</h3></div>
                    <TextField
                    fullWidth
                        type="datetime-local"
                        {...register("departureDate")}/>
                </div>

                <div className="input-field">
                    <div className="add-flight-dates"><FlightLandIcon /><h3>Return</h3></div>
                    <TextField
                        type="datetime-local"
                        fullWidth
                        {...register("returnDate")} />
                </div>
                <div>
                    <TextField
                    fullWidth
                        type="number"
                        label="Price $"
                        placeholder="Price $"
                        {...register("price")}/>
                </div>
                <div className="image-upload-container">
                    <h3 className="image-label">Upload image</h3>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="image-input"/>
                </div>
                    <Button className="add-btn"
                        type="submit"
                        variant="contained">
                        Save
                    </Button>
            </form >
        </div >
    );
}
