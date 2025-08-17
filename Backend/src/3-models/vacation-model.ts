import { UploadedFile } from "express-fileupload";
import { ValidationError } from "./error-models";
import Joi from "joi";

export class VacationModel {
    public id?: number;

    public destination!: string;
    public departureDate!: string;
    public returnDate!: string;
    public description!: string;
    public price!: number;

    public image?: UploadedFile;
    public imageUrl?: string;
    public imageName: string | null | undefined;

    constructor(vacation: VacationModel) {
        if (!vacation) throw new ValidationError("Missing vacation data");

        this.id = vacation.id;
        this.destination = vacation.destination;
        this.departureDate = vacation.departureDate;
        this.returnDate = vacation.returnDate;
        this.description = vacation.description;
        this.price = vacation.price;

        this.image = vacation.image;
        this.imageUrl = vacation.imageUrl;
        this.imageName = vacation.imageName;
    }

    private static validationSchema = Joi.object(
        {
            id: Joi.number().optional().positive(),

            destination: Joi.string().required().max(50),
            departureDate: Joi.string().required().max(50),
            returnDate: Joi.string().required().max(50),
            description: Joi.string().required().max(10000),
            price: Joi.number().required().min(0).max(10000),

            image: Joi.object().optional(),
            imageUrl: Joi.string().optional().uri,
            imageName: Joi.string().optional().max(50)
        }
    );

    public validate(): void {
        const result = VacationModel.validationSchema.validate(this);
        if (result.error) throw new ValidationError(result.error.message);
    }
}
