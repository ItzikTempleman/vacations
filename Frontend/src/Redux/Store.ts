import { configureStore } from "@reduxjs/toolkit";
import { UserModel } from "../Models/user-model/UserModel";
import { userSlice } from "./UserSlice";
import { VacationModel } from "../Models/VacationModel";
import { vacationSlice } from "./VacationSlice";
import { LikeModel } from "../Models/LikeModel";
import { likesSlice } from "./LikeSlice";

export type AppState = {
    user: UserModel,
    vacation:VacationModel[],
    likes:LikeModel[]
};

export const store = configureStore<AppState>(
    {
        reducer: {
            user: userSlice.reducer,
            vacation:vacationSlice.reducer,
            likes: likesSlice.reducer
        }
    }
)

