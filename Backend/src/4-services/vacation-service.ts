import { fileSaver } from "uploaded-file-saver";
import appConfig from "../2-utils/app-config";
import { dal } from "../2-utils/dal";
import { VacationModel } from "../3-models/vacation-model";
import { OkPacketParams } from "mysql2";
import { ResourceNotFoundError, ValidationError } from "../3-models/error-models";

class VacationService {

    public async getAllVacations(): Promise<VacationModel[]> {
        const sql = "select vacationstable.*, concat(?,imageName) as imageUrl from vacationstable order by departureDate asc";
        const values = [appConfig.baseImageUrl];
        const vacations = await dal.execute(sql, values) as VacationModel[];
        return vacations;
    };

    public async getLikedVacations(): Promise<VacationModel[]> {
        const sql = "select distinct vacationstable.*, concat(?,imageName) as imageUrl from vacationstable join likes l on vacationstable.id = l.vacationid order by departureDate asc";
        const values = [appConfig.baseImageUrl];
        const vacations = await dal.execute(sql, values) as VacationModel[];
        return vacations;
    };


    public async getActiveVacations(): Promise<VacationModel[]> {
        const sql = "select vacationstable.*, concat(?,imageName) as imageUrl from vacationstable where departureDate <= now() and returnDate >= now() order by departuredate asc"
        const values = [appConfig.baseImageUrl];
        const vacations = await dal.execute(sql, values) as VacationModel[];
        return vacations;
    };

    public async getFutureVacations(): Promise<VacationModel[]> {
        const sql = "select vacationstable.*, concat(?,imageName) as imageUrl from vacationstable where departureDate >= now() order by departuredate asc";
        const values = [appConfig.baseImageUrl];
        const vacations = await dal.execute(sql, values) as VacationModel[];
        return vacations;
    };

    public async getOneVacation(id: number): Promise<VacationModel> {
        const sql = `select * , concat(?,imageName) as imageUrl from vacationstable where id = ?`;
        const values = [appConfig.baseImageUrl, id];
        const vacations = await dal.execute(sql, values) as VacationModel[];
        const vacation = vacations[0];
        if (!vacation) throw new ResourceNotFoundError(id);
        return vacation;
    }

    public async addVacation(vacation: VacationModel): Promise<VacationModel> {
        vacation.validate();
        const imageName = vacation.image ? await fileSaver.add(vacation.image) : null;
        vacation.imageName = imageName;
        const sql = "insert into vacationstable (destination,departureDate,returnDate,description,price, imageName) values (?,?,?,?,?,?)";
        const values = [vacation.destination, vacation.departureDate, vacation.returnDate, vacation.description, vacation.price, imageName];
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        vacation.id = info.insertId;
        vacation.image = undefined;
        vacation.imageUrl = imageName ? appConfig.baseImageUrl + imageName : "";
        return vacation;
    };


    public async updateVacation(vacation: VacationModel): Promise<VacationModel> {
        if (vacation.id === undefined) {
            throw new ValidationError("Missing vacation id to update");
        };

        vacation.validate();
        const oldImageName = await this.getImageName(vacation.id);
        const newImageName = vacation.image ? await fileSaver.update(oldImageName!, vacation.image) : oldImageName;
        const sql = "update vacationstable set destination=?, departureDate=?,returnDate=?,description=?, price=?, imageName=? where id=?";
        const values = [vacation.destination, vacation.departureDate, vacation.returnDate, vacation.description, vacation.price, newImageName, vacation.id];
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        if (info.affectedRows === 0) throw new ResourceNotFoundError(vacation.id);
        const dbVacation = await this.getOneVacation(vacation.id);
        return dbVacation;
    }

    public async deleteVacation(id: number): Promise<void> {
        const sql = "delete from vacationstable where id=?";
        const values = [id];
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    }


    private async getImageName(id: number): Promise<string | null | undefined> {
        const sql = "select imageName from vacationstable where id=?";
        const values = [id];
        const vacations = await dal.execute(sql, values) as VacationModel[];
        const vacation = vacations[0];
        if (!vacation) return null;
        return vacation.imageName;
    }

    public async isLiked(userId: number, vacationId: number): Promise<boolean> {
        const sql = "select userId, vacationId from likes where userId=? and vacationId=? limit 1";
        const values = [userId, vacationId];
        type liked = { userId: number, vacationId: number };
        const match = await dal.execute(sql, values) as liked[];
        return match.length === 1;
    }


    public async likeVacation(userId: number, vacationId: number): Promise<boolean> {
        if (await this.isLiked(userId, vacationId)) return false;

        const sql = "insert into likes(userId, vacationId) values (?,?)";
        const values = [userId, vacationId];
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        return info.affectedRows === 1;
    }


    public async unlikeVacation(userId: number, vacationId: number): Promise<boolean> {
        const sql = "delete from likes where userId=? and vacationId=? limit 1";
        const values = [userId, vacationId];
        const result: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        return result.affectedRows === 1;
    }

    public async getVacationTotalLikedCount(vacationId: number): Promise<number> {
        const sql = "select count(*) as likescount from likes where vacationId=?";
        const values = [vacationId];
        const totalLikes = await dal.execute(sql, values) as {
            likescount: number
        }[];
        return totalLikes.length > 0 ? totalLikes[0].likescount : 0;
    };

};

export const vacationService = new VacationService();