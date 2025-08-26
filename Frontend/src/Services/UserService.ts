import { store } from "../Redux/Store.ts";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/user-model/UserModel";
import { userSlice } from "../Redux/UserSlice";
import axios from "axios";
import { appConfig } from "../utils/AppConfig.ts";
import { CredentialsModel } from "../Models/user-model/CredentialsModel";

type DecodedToken = { user: UserModel };

class UserService {

    public constructor() {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            const dbUser = decoded.user
            store.dispatch(userSlice.actions.registrationAndLogin(dbUser))
        }
    };

    public async registerUser(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token: string = response.data;
        const decoded = jwtDecode<DecodedToken>(token)
        const dbUser = decoded.user;
        store.dispatch(userSlice.actions.registrationAndLogin(dbUser))
        localStorage.setItem("token", token);
    };

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);
        const token: string = response.data;
        const decoded = jwtDecode<DecodedToken>(token);
        const dbUser = decoded.user;
        console.log("[UserService.login] decoded user:", dbUser);
        store.dispatch(userSlice.actions.registrationAndLogin(dbUser));
        localStorage.setItem("token", token);
    };


    
    public logout(): void {
        store.dispatch(userSlice.actions.logout());
        localStorage.removeItem("token");
    };
}

export const userService = new UserService();