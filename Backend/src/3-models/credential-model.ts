export class CredentialsModel {
    public email: string = "";
    public password: string = "";

    public constructor(credentials?: any) {
        if (credentials) {
            this.email = credentials.email || "";
            this.password = credentials.password || "";
        }
    }
}