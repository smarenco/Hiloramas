import { types } from "../types/types";

const initialState = {
    notes: [],
    active: null
}
export const noteReducer = (state = initialState, action) => {

    switch ( action.type ) {
        case types.notesAddNew:
            return {
                ...state,
                notes: [
                    action.payload,
                    ...state.notes
                ]
            }
        case types.notesActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.notesLoad:
            return {
                ...state,
                notes: [ ...action.payload ]
            }
        case types.notesLogoutCleaning:
            return { 
                ...state,
                active: null,
                notes: []
            }
        default:
           return state; 
    }
}