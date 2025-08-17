class AppConfig {
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
    public readonly likeUrl = "http://localhost:4000/api/vacations/liked/";
    public readonly imageBaseUrl = "http://localhost:4000/api/vacations/images/";

    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/vacations/liked/";
    public readonly usersUrl = "http://localhost:4000/api/users/";

}

export const appConfig = new AppConfig();
