import axios from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../utils/AppConfig";
import { store } from "../Redux/Store";
import { initVacations } from "../Redux/VacationSlice";


class VacationService {
    // to add vacation header later

    //  const options: AxiosRequestConfig = {
    //         headers: {
    //             "Content-Type": "multipart/form-data"
    //         }
    //     };

    private loggedInUser = localStorage.getItem("token");
    public async getAllVacations(): Promise<VacationModel[]> {
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl, 
            { headers: { Authorization: `Bearer ${this.loggedInUser}` } });
        const vacations = response.data;
        store.dispatch(initVacations(vacations));
        return vacations;
    };


    public async getLikesCount(vacationId: number): Promise<number> {
        const response = await axios.get<number>(`${appConfig.vacationsUrl}/liked/${vacationId}`,
            { headers: { Authorization: `Bearer ${this.loggedInUser}` } });
        const likes = response.data;
        return likes;
    }
}

export const vacationService = new VacationService();

