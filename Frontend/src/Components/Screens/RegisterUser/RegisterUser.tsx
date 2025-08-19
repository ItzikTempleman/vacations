import { useTitle } from "../../../Utils/UseTitle";
import "./RegisterUser.css";
import { UserModel } from "../../../Models/user-model/UserModel";
import { notify } from "../../../Utils/Notify";
import { userService } from "../../../Services/UserService";
import { useForm } from "react-hook-form";
import { Button, TextField } from "@mui/material";

export function RegisterUser() {
    useTitle("Registration");
    const { register, handleSubmit } = useForm<UserModel>();

    async function send(user: UserModel) {
        try {
            await userService.registerUser(user);

            notify.success("Welcome " + user.firstName + " " + user.familyName)
        } catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="RegisterUser">

            <h2 className="header-login-register-title">Register </h2>

            <form onSubmit={handleSubmit(send)}>
                <div className="form-container">
                    <TextField 
                        label="Enter first name"
                        placeholder="first name"
                        {...register("firstName")}
                    />
                    <TextField 
                        label="Enter family name"
                        placeholder="family name"
                        {...register("familyName")}
                    />
       
                    <TextField 
                     type="email"
                        label="Enter email "
                        placeholder="email"
                        {...register("email")}
                    />
                    <TextField 
                    autoComplete="new-password"
                    type="password" 
                        label="Create a password"
                        placeholder="generate password"
                        {...register("password", { required: true, minLength: 8 })}
                    />
             
            
                    <Button
                        type="submit"
                    fullWidth
                        style={{ backgroundColor: "#1e5b8c", color: "white" }}
                        variant="contained"
                    >
                        Register
                    </Button>
            </div>
            </form>
        </div>
    );
}
