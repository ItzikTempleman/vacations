import express, { NextFunction, Request, Response } from "express";
import { vacationService } from "../4-services/vacation-service";
import { fileSaver } from "uploaded-file-saver";
import { VacationModel } from "../3-models/vacation-model";
import { verificationMiddleware } from "../6-middleware/verification-middleware";
import StatusCode from "../3-models/status-code";
import { ResourceNotFoundError } from "../3-models/error-models";
class VacationController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/vacations/sorted/all", verificationMiddleware.verifyLoggedIn, this.getAllVacations);
        this.router.get("/vacations/sorted/liked", verificationMiddleware.verifyLoggedIn, this.getLikedVacations);
        this.router.get("/vacations/sorted/active", verificationMiddleware.verifyLoggedIn, this.getActiveVacations);
        this.router.get("/vacations/sorted/future", verificationMiddleware.verifyLoggedIn, this.getFutureVacations);


        this.router.get("/vacations/:id", verificationMiddleware.verifyLoggedIn, this.getOneVacation);

        this.router.post("/vacations", verificationMiddleware.verifyIsAdmin, this.addVacation);
        this.router.put("/vacations/:id", verificationMiddleware.verifyIsAdmin, this.updateVacation);
        this.router.delete("/vacations/:id", verificationMiddleware.verifyIsAdmin, this.deleteVacation);
        this.router.get("/vacations/images/:imageName", this.getImage);

        this.router.post("/vacations/liked/:vacationId", verificationMiddleware.verifyIsUser, this.likeVacation.bind(this));
        this.router.delete("/vacations/liked/:vacationId", verificationMiddleware.verifyIsUser, this.unlikeVacation.bind(this));
        this.router.get("/vacations/liked/:vacationId", verificationMiddleware.verifyLoggedIn, this.getVacationTotalLikedCount.bind(this));

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
    public async getLikedVacations(request: Request, response: Response) {
        const vacations = await vacationService.getLikedVacations();
        response.json(vacations);
    };

    public async getActiveVacations(request: Request, response: Response) {
        const vacations = await vacationService.getActiveVacations();
        response.json(vacations);
    };

    public async getFutureVacations(request: Request, response: Response) {
        const vacations = await vacationService.getFutureVacations();
        response.json(vacations);
    };

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


    public async getVacationTotalLikedCount(request: Request, response: Response) {
        const vacationId = +request.params.vacationId;
        try {
            const likedCount = await vacationService.getVacationTotalLikedCount(vacationId)
            return response.json(likedCount);
        } catch (err: any) {
            throw new ResourceNotFoundError(vacationId)
        }
    };

    private async getImage(request: Request, response: Response) {
        const imageName = request.params.imageName;
        const imagePath = fileSaver.getFilePath(imageName);
        response.sendFile(imagePath);
    }

};

export const vacationController = new VacationController();
