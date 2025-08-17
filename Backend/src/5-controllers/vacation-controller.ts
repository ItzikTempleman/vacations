import express, { NextFunction, Request, Response } from "express";
import { vacationService } from "../4-services/vacation-service";
import { fileSaver } from "uploaded-file-saver";
import { VacationModel } from "../3-models/vacation-model";
import { verifyUser } from "../6-middleware/verification-middleware";
import StatusCode from "../3-models/status-code";
class VacationController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/vacations", this.getAllVacations);
        this.router.get("/vacations/:id", this.getOneVacation);

        this.router.post("/vacations", verifyUser.verifyIsAdmin, this.addVacation);
        this.router.put("/vacations/:id", verifyUser.verifyIsAdmin, this.updateVacation);
        this.router.delete("/vacations/:id", verifyUser.verifyIsAdmin, this.deleteVacation);
        this.router.get("/vacations/images/:imageName", this.getImage);

        this.router.post("/vacations/liked/:vacationId", verifyUser.verifyIsUser, this.likeVacation.bind(this));
        this.router.delete("/vacations/liked/:vacationId", verifyUser.verifyIsUser, this.unlikeVacation.bind(this));
    };

    public async getOneVacation(request: Request, response: Response) {
        const id = Number(request.params.id);
        const vacations = await vacationService.getOneVacation(id);
        response.json(vacations);
    }

    public async getAllVacations(request: Request, response: Response) {
        const vacations = await vacationService.getAllVacations();
        response.json(vacations);
    }


    public async addVacation(request: Request, response: Response) {
        request.body.image = request.files?.image;
        const vacation = new VacationModel(request.body);
        const dbVacation = await vacationService.addVacation(vacation);
        response.json(dbVacation);
    }


    public async updateVacation(request: Request, response: Response) {
        request.body.image = request.files?.image;
        request.body.id = +request.params.id;
        const vacation = new VacationModel(request.body);
        const dbVacation = await vacationService.updateVacation(vacation);
        response.json(dbVacation);
    }

    public async deleteVacation(request: Request, response: Response) {
        const id = Number(request.params.id);
        await vacationService.deleteVacation(id);
        response.sendStatus(StatusCode.NoContent);
    }

    public async likeVacation(request: Request, response: Response) {
        const userId = (request as any).user.id;
        const vacationId = Number(request.params.vacationId);
        if (Number.isNaN(vacationId) || vacationId <= 0) {
            return response.status(StatusCode.BadRequest).send("Route param vacationId must be a positive number");
        };
        const success = await vacationService.likeVacation(userId, vacationId);
        return response.json(success ? "liked" : "already liked");
    }


    public async unlikeVacation(request: Request, response: Response) {
        const userId = (request as any).user.id;
        const vacationId = Number(request.params.vacationId);
        if (Number.isNaN(vacationId) || vacationId <= 0) {
            return response.status(StatusCode.BadRequest).send("Route param vacationId must be a positive number");
        };
        const success = await vacationService.unlikeVacation(userId, vacationId);
        return response.json(success ? "unliked" : "not liked");
    }

    private async getImage(request: Request, response: Response) {
        const imageName = request.params.imageName;
        const imagePath = fileSaver.getFilePath(imageName);
        response.sendFile(imagePath);
    }

};

export const vacationController = new VacationController();
