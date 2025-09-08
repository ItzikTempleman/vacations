class AppConfig {
    public readonly vacationsUrl = "http://localhost:4000/api/vacations/";
    public readonly getAllVacationsUrl = "http://localhost:4000/api/vacations/sorted/all/";
    public readonly getLikedVacationsUrl = "http://localhost:4000/api/vacations/sorted/liked/";
    public readonly getActiveVacationsUrl = "http://localhost:4000/api/vacations/sorted/active/";
    public readonly getFutureVacationsUrl = "http://localhost:4000/api/vacations/sorted/future/";
    public readonly likeUrl = "http://localhost:4000/api/vacations/liked/";
    public readonly imageBaseUrl = "http://localhost:4000/api/vacations/images/";

    public readonly registerUrl = "http://localhost:4000/api/register/";
    public readonly loginUrl = "http://localhost:4000/api/login/";
    public readonly usersUrl = "http://localhost:4000/api/users/";

    
    public noImage = "/Assets/images/No_Image_Available.jpg";
}

export const appConfig = new AppConfig();
