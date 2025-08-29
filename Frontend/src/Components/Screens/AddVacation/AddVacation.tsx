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
            vacation.departureDate=formattedTakeOffTime;
            const formattedLandingOffTime = vacation.returnDate.replace("T", " "); 
            vacation.returnDate=formattedLandingOffTime;
            await vacationService.addVacation(vacation);
            notify.success("Created vacation");
            navigate("/home");
        } catch (err: any) {
            notify.error(err)
        }
    }

    return (
         <div className="AddVacation">
            <p>Add a new vacation</p>
        <div className="add-vacation-form">
            
            <form onSubmit={handleSubmit(send)} className="vacation-form">

                <div className="input-field">
                    <TextField
                        label="Destination "
                        placeholder="Where are you going?"
                        {...register("destination")}
                    />
                </div>

                <div className="input-field">
                    <TextField className="input-field-desc"
                        label="Description"
                        multiline
                        minRows={6}
                        placeholder="Tell us about your vacation"
                        {...register("description")}
                        
                    />
                </div>

                <div className="input-field">
                    <div><FlightTakeoffIcon /><label>starts on</label></div>
                    <TextField
                        type="datetime-local"
                        {...register("departureDate")}
                    />
                </div>

                <div className="input-field">
                    <div><FlightLandIcon /><label>ends on</label></div>
                    <TextField
                        type="datetime-local"
                        {...register("returnDate")}
                    />
                </div>

                <div className="input-field">
                    <TextField 
                    type="number"
                        label="Price "
                        placeholder="Price"
                        {...register("price")}
                    />
                </div>
                <div className="image-upload-container">
                    <p className="image-label">Upload image</p>
                    <input
                        type="file"
                        accept="image/*"
                        {...register("image")}
                        className="image-input"
                    />
                </div>
                <div className="addBtn">
                    <Button
                        type="submit"

                        style={{ backgroundColor: "#1e5b8c", color: "white" }}
                        variant="contained"
                    >
                        Save
                    </Button>
                </div>
            </form >

        </div >
        </div>
    );
}
