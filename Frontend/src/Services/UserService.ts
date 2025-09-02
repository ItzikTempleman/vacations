import { store } from "../Redux/Store.ts";
import { jwtDecode } from "jwt-decode";
import { UserModel } from "../Models/user-model/UserModel";
import { userSlice } from "../Redux/UserSlice";
import axios from "axios";
import { appConfig } from "../utils/AppConfig.ts";
import { CredentialsModel } from "../Models/user-model/CredentialsModel";
import { clearVacations } from "../Redux/VacationSlice.ts";

type DecodedToken = {
    user: UserModel;
    tokenExpiration?: number
};

class UserService {

    private logoutTimer: number | null = null;

    private scheduleLogoutFromToken(token: string) {
        try {
            const { tokenExpiration } = jwtDecode<DecodedToken>(token);
            if (!tokenExpiration) return;
            const delay = Math.max(0, tokenExpiration * 1000 - Date.now());
            if (this.logoutTimer) clearTimeout(this.logoutTimer);
            this.logoutTimer = setTimeout(() => {
                this.logout(true), delay;
            }
            );
        } catch {

        }
    };

    public constructor() {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<DecodedToken>(token);
            const notExpired = decoded?.tokenExpiration ? decoded.tokenExpiration * 1000 > Date.now() : true;
            if (notExpired && decoded?.user) {
                store.dispatch(userSlice.actions.registrationAndLogin(decoded.user));
                this.scheduleLogoutFromToken(token);
            } else {
                this.logout(true);
            }
        }
    };

    public async registerUser(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);
        const token: string = response.data;
        const decoded = jwtDecode<DecodedToken>(token);
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



    public logout(_=false): void {
        if (this.logoutTimer) {
            clearTimeout(this.logoutTimer);
            this.logoutTimer = null;
        }
        store.dispatch(userSlice.actions.logout());
        store.dispatch(clearVacations());
        localStorage.removeItem("token");
    };
}

export const userService = new UserService();