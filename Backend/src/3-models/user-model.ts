export class UserModel {
    public id!: number;
    public firstName!: string;
    public familyName!: string;
    public email!: string;
    public password!: string;
    public roleId!: number;


    public constructor(user: UserModel) {
        this.id = user.id;
        this.firstName = user.firstName;
        this.familyName = user.familyName;
        this.email = user.email;
        this.password = user.password;
        this.roleId = user.roleId;

    }
}


