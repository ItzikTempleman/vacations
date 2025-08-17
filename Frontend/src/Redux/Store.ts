import { configureStore } from "@reduxjs/toolkit";
import { UserModel } from "../Models/user-model/UserModel";
import { userSlice } from "./UserSlice";
import { VacationModel } from "../Models/VacationModel";
import { vacationSlice } from "./VacationSlice";

export type AppState = {
    user: UserModel,
    vacation:VacationModel[]
};

export const store = configureStore<AppState>(
    {
        reducer: {
            user: userSlice.reducer,
            vacation:vacationSlice.reducer
        }
    }
)

