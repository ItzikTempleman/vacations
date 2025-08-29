import { OkPacketParams } from "mysql2";
import { cyber } from "../2-utils/cyber";
import { dal } from "../2-utils/dal";
import { CredentialsModel } from "../3-models/credential-model";
import { AuthorizationError, ResourceNotFoundError, ValidationError } from "../3-models/error-models";
import { Role } from "../3-models/role";
import { UserModel } from "../3-models/user-model";

class UserService {

    public async register(user: UserModel): Promise<string> {

        const taken = await this.isEmailTaken(user.email);
        if (taken) throw new ValidationError("Email already exists");
        const sql = "insert into users(firstName, familyName, email, password, roleId) values(?,?,?,?,?)";
        user.roleId = Role.User;
        user.password = cyber.hash(user.password);
        const values = [user.firstName, user.familyName, user.email, user.password, user.roleId];
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        user.id = info.insertId!;
        return cyber.generateToken(user);

    }

    public async login(credentials: CredentialsModel): Promise<string> {
        credentials.password = cyber.hash(credentials.password);
        const sql = "select * from users where email=? and password=?";
        const values = [credentials.email, credentials.password];
        const users = await dal.execute(sql, values) as UserModel[];
        const user = users[0];
        if (!user) throw new AuthorizationError("Incorrect email or password");
        return cyber.generateToken(user);
    }

    public async getAllUsers(): Promise<UserModel[]> {
        const sql = "select * from users";
        const users = await dal.execute(sql) as UserModel[];;
        return users;
    }

    private async isEmailTaken(email: string): Promise<boolean> {
        const sql = "select id from users where email=?";
        const values = [email];
        const users = await dal.execute(sql, values) as UserModel[];
        return users.length > 0
    }


    public async removeUserAccount(id: number): Promise<void> {
        const sql = "delete from users where id=?";
        const values = [id];
        const info: OkPacketParams = await dal.execute(sql, values) as OkPacketParams;
        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);
    }
};

export const userService = new UserService();
