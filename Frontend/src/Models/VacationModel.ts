export class VacationModel {
    public id?: number;
    public destination!: string;
    public departureDate!: string;
    public returnDate!: string;
    public description!: string;
    public price!: number;
    public image?: File;
    public imageUrl?: string;
}
