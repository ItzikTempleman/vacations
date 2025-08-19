import { useForm } from "react-hook-form";
import { useTitle } from "../../../Utils/UseTitle";
import "./LoginScreen.css";
import { CredentialsModel } from "../../../Models/user-model/CredentialsModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../Utils/Notify";
import { Button, TextField } from "@mui/material";

export function LoginScreen() {
    useTitle("Login");

    const { register, handleSubmit } = useForm<CredentialsModel>();

    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials)

            notify.success("Welcome back")
        } catch (err: unknown) {
            notify.error(err)
        }
    }

    return (
        <div className="LoginScreen">

            <h2>Log in</h2>

            <form onSubmit={handleSubmit(send)}>
                <div className="login-form-container">
                    <TextField
                        label="Enter email "
                        placeholder="Email"
                        {...register("email")}
                    />
                    <TextField
                        label="Enter password"
                        placeholder="Password"
                        {...register("password")}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        style={{ backgroundColor: "#1e5b8c", color: "white" }}
                        variant="contained"
                    >
                        Log in
                    </Button>
                </div>
            </form>
        </div>
    );
}
