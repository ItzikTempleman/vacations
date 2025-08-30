import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../utils/AppConfig";
import { store } from "../Redux/Store";
import { addVacation, deleteVacation, initVacations, updateVacation } from "../Redux/VacationSlice";
import { notify } from "../utils/Notify";
import { UserModel } from "../Models/user-model/UserModel";
import { jwtDecode } from "jwt-decode";
import { Role } from "../Models/user-model/Role";


class VacationService {

    private getAuth(): AxiosRequestConfig {
        const token = localStorage.getItem("token") ?? "";
        return { headers: { Authorization: `Bearer ${token}` } };
    }

    private getRole(): UserModel | null {
        const token = localStorage.getItem("token") ?? "";
        try {
            const decoded = jwtDecode<{ user: UserModel }>(token);
            return decoded.user ?? null;
        } catch {
            return null;
        }
    }

    private getAuthMultipart(): AxiosRequestConfig {
        const token = localStorage.getItem("token") ?? "";
        return {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data"
            }
        };

    }


    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl, this.getAuth());
        const vacations = response.data;
        store.dispatch(initVacations(vacations));
        return vacations;
    };

    public async getLikesCount(vacationId: number): Promise<number> {
        const response = await axios.get<number>(`${appConfig.likeUrl}${vacationId}`, this.getAuth());
        const likes = response.data;
        return likes;
    };

    public async getOneVacation(vacationId: number): Promise<VacationModel> {
        const response = await axios.get<VacationModel>(`${appConfig.vacationsUrl}${vacationId}`, this.getAuth());
        const vacation = response.data;
        return vacation;
    };

    public async addVacation(vacation: VacationModel): Promise<void> {
        const response = await axios.post<VacationModel>(`${appConfig.vacationsUrl}`, vacation, this.getAuthMultipart());
        const addedVacation = response.data;
        store.dispatch(addVacation(addedVacation));
    };

    public async updateVacation(vacation: VacationModel): Promise<void> {
        try {
            const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.id, vacation, this.getAuthMultipart());
            const updatedVacation = response.data;
            store.dispatch(updateVacation(updatedVacation));
        } catch (err: any) {
            notify.error(err);
        };
    };

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + vacationId, this.getAuth());
        await this.unlikeVacation(vacationId)
        store.dispatch(deleteVacation(vacationId));
    };

    public async likeVacation(vacationId: number): Promise<void> {
        if (this.getRole()?.roleId === Role.Admin) {
            throw new Error("Admin cannot like a vacation - restricted to regular users");
        }
        try {
            await axios.post(appConfig.likeUrl + vacationId, null, this.getAuth());
        } catch (err: any) {
            throw new Error(err?.response?.data ?? err.message ?? "Like failed");
        }
    };

    public async unlikeVacation(vacationId: number): Promise<void> {
        if (this.getRole()?.roleId === Role.Admin) {
            throw new Error("Admin cannot unlike a vacation - restricted to regular users");
        }
        try {
            await axios.delete(appConfig.likeUrl + vacationId, this.getAuth());
        } catch (err: any) {
            throw new Error(err?.response?.data ?? err.message ?? "Unlike failed");
        }
    }
};

export const vacationService = new VacationService();

