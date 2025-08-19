import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/user-model/UserModel";

function registerOrLogin(_: UserModel, action: PayloadAction<UserModel>) {
    return action.payload;
};

function logoutUser(_: UserModel, __: PayloadAction<UserModel>): null {
    return null
};

export const userSlice = createSlice(
    {
        name: "users",
        initialState: new UserModel(),
        reducers: {
        registrationAndLogin:registerOrLogin,
        logout:logoutUser
        }
    }
);

export const {registrationAndLogin,logout}= userSlice.actions;
export const userReducer= userSlice.reducer;