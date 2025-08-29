import axios, { AxiosRequestConfig } from "axios";
import { VacationModel } from "../Models/VacationModel";
import { appConfig } from "../utils/AppConfig";
import { store } from "../Redux/Store";
import { addVacation, deleteVacation, initVacations, updateVacation } from "../Redux/VacationSlice";
import { notify } from "../utils/Notify";


class VacationService {

  private getAuth(): AxiosRequestConfig {
    const token = localStorage.getItem("token") ?? "";
    return { headers: { Authorization: `Bearer ${token}` } };
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
            notify.error(err.message);
        };
    };

    public async deleteVacation(vacationId: number): Promise<void> {
        await axios.delete(appConfig.vacationsUrl + vacationId,this.getAuth());
        await this.unlikeVacation(vacationId)
        store.dispatch(deleteVacation(vacationId));
    };

    public async unlikeVacation(vacationId: number): Promise<void> {
        axios.delete(appConfig.likeUrl + vacationId, this.getAuth());
    };

        public async likeVacation(vacationId: number): Promise<void> {
        axios.post(appConfig.likeUrl + vacationId, this.getAuth());
    };
};

export const vacationService = new VacationService();

