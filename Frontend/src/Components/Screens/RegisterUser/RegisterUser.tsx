import { useTitle } from "../../../utils/UseTitle";
import "./RegisterUser.css";
import { UserModel } from "../../../Models/user-model/UserModel";
import { notify } from "../../../utils/Notify";
import { userService } from "../../../Services/UserService";
import { useForm } from "react-hook-form";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";


export function RegisterUser() {
    useTitle("Registration");

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<UserModel>({ mode: "onChange" });

    async function send(user: UserModel) {
        try {
            await userService.registerUser(user);

            notify.success("Welcome " + user.firstName + " " + user.familyName)
            reset();
        } catch (err: any) {
            notify.error(err)
        }
    }

    return (
        <div className="RegisterUser">
            <form className="registration-form" onSubmit={handleSubmit(send)}>
                     <h2 className="registration-title">Register </h2>
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
                        autoComplete="email"
                        label="Enter email"
                        placeholder="Email"
                        fullWidth
                        {...register("email", {
                            required: "Email is required",
                            pattern: {
                                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                message: "Enter a valid email"
                            }
                        })}
                        error={!!errors.email}
                        helperText={errors.email?.message} />

                    <TextField
                        autoComplete="current-password"
                        label="Enter password"
                        placeholder="Password"
                        fullWidth
                        type={showPassword ? "text" : "password"}
                        {...register("password", {
                            required: "Password is required",
                            minLength: { value: 8, message: "At least 8 characters" }
                        })}
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        edge="end"
                                        tabIndex={-1}
                                        onClick={() => setShowPassword((s) => !s)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )
                        }}
                    />
                    <Button
                        type="submit"
                        className="register-button"
                        variant="contained">
                        Register
                    </Button>
            </form>
        </div>
    );
}
