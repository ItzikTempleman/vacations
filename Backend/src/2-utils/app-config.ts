import dotenv from "dotenv";
dotenv.config();

class AppConfig {
    public readonly port = Number(process.env.PORT);
    public readonly mysqlHost = process.env.MYSQL_HOST;
    public readonly mysqlUser = process.env.MYSQL_USER;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE;
    public readonly baseImageUrl = process.env.BASE_IMAGE_URL!;
    public readonly jwtSecretKey = process.env.JWT_SECRET_KEY!;
    public readonly hashSaltKey = process.env.HASH_SALT_KEY!;
}

const appConfig = new AppConfig();
export default appConfig;
