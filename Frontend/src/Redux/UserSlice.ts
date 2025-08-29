import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/user-model/UserModel";

function registerOrLogin(_: UserModel, action: PayloadAction<UserModel>) {
    return action.payload;
};

function logoutUser(user: UserModel, _: PayloadAction<UserModel>) {
     user=== new UserModel();
};


export const userSlice = createSlice(
    {
        name: "users",
        initialState: null as UserModel | null,
        reducers: {
        registrationAndLogin:registerOrLogin,
        logout: logoutUser
        }
    }
);

export const {registrationAndLogin,logout}= userSlice.actions;
export const userReducer= userSlice.reducer;