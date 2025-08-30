import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { VacationModel } from "../Models/VacationModel";

const initialVacation: VacationModel[] = [];


function initVacationReducer(_: VacationModel[], action: PayloadAction<VacationModel[]>) {
    return action.payload;
}

function addVacationReducer(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    return [...currentState, action.payload];
}

function updateVacationReducer(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    const vacationToUpdate = action.payload;
    //find the id of the vacation that im updating 
    const indexToUpdate = newState.findIndex(vacation => (
        vacation.id === vacationToUpdate.id)
    );
    newState[indexToUpdate] = vacationToUpdate;
    return newState;
}

function deleteVacationReducer(currentState: VacationModel[], action: PayloadAction<number>): VacationModel[] {
    const newState = [...currentState];
    const vacationToDelete = action.payload;
    const indexDelete = newState.findIndex(vacation => (
        vacation.id === vacationToDelete)
    );
    newState.splice(indexDelete, 1);
    return newState;
}

export const vacationSlice = createSlice(
    {
        name: "vacations",
        initialState: initialVacation,
        reducers: {
            initVacations: initVacationReducer,
            addVacation: addVacationReducer,
            updateVacation: updateVacationReducer,
            deleteVacation: deleteVacationReducer,
            clearVacations: () => []
        }
    }
);

export const { initVacations, addVacation, updateVacation, deleteVacation,clearVacations} = vacationSlice.actions;
export const vacationReducer = vacationSlice.reducer;