import { useState } from "react"; // <-- add
import { useForm } from "react-hook-form";
import { useTitle } from "../../../utils/UseTitle";
import "./LoginScreen.css";
import { CredentialsModel } from "../../../Models/user-model/CredentialsModel";
import { userService } from "../../../Services/UserService";
import { notify } from "../../../utils/Notify";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { NavLink, useNavigate } from "react-router-dom";

export function LoginScreen() {
    useTitle("Login");
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<CredentialsModel>(
        { mode: "onChange" }
    );
    const navigate = useNavigate();
    async function send(credentials: CredentialsModel) {
        try {
            await userService.login(credentials);
            navigate("/home");
            reset();
        } catch (err: unknown) {
            notify.error(err)
        }
    }

    return (
        <div className="LoginScreen">
            <form className="login-form" onSubmit={handleSubmit(send)}>

                <h2 className="login-title">Log in</h2>
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
                    className="login-button"
                    variant="contained">
                    Log in
                </Button>

                <nav className="register">
                    <p className="no-account-text">Don't have an account?</p>
                    <NavLink to="/register" className="register-link">
                        <PersonAddIcon className="register-icon" />
                        <span className="register-label">Register</span>
                    </NavLink>
                </nav>
                
            </form>
        </div>
    );
}
