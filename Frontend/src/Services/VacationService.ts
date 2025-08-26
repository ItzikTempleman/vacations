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

    public async getAllVacations(): Promise<VacationModel[]> {
         const token = localStorage.getItem("token");
        const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl,
{
        headers: {
            Authorization: `Bearer ${token}`
        }
}


        );
        const vacations = response.data;
        store.dispatch(initVacations(vacations));
        return vacations;
    };

    


}

export const vacationService = new VacationService();

