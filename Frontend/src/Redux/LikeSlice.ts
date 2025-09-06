import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LikeModel } from "../Models/LikeModel";


const initialLikes: LikeModel[] = [];

function initLikesReducer(_: LikeModel[], action: PayloadAction<LikeModel[]>) {
    return action.payload;
}

function like(currentLikeState: LikeModel[], action: PayloadAction<LikeModel>) {
    return [...currentLikeState, action.payload];
}

function unlike(currentLikeState: LikeModel[], action: PayloadAction<LikeModel>) {
    return currentLikeState.filter(like => 
        !(like.userId === action.payload.userId && like.vacationId === action.payload.vacationId)
    );
};



export const likesSlice= createSlice(
    {
        name:"likes",
        initialState:initialLikes,
        reducers:{
            initAndSetLikes:initLikesReducer,
            addLike:like,
            removeLike:unlike
        }
    }
);

export const {initAndSetLikes,addLike,removeLike} = likesSlice.actions;
export const likesReducer= likesSlice.reducer;
