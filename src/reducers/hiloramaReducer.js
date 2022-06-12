import { types } from "../types/types";

const initialState = {
    items: [],
    active: null
}
export const hiloramaReducer = (state = initialState, action) => {

    switch ( action.type ) {
        case types.hiloramaAddNew:
            return {
                ...state,
                items: [
                    action.payload,
                    ...state.items
                ]
            }
        case types.hiloramaActive:
            return {
                ...state,
                active: {
                    ...action.payload
                }
            }
        case types.hiloramaLoad:
            return {
                ...state,
                items: [ ...action.payload ]
            }
        case types.hiloramaUpdated:
            return {
                ...state,
                items: state.items.map(
                    hilorama => hilorama.id === action.payload.id ?
                        action.payload.hilorama :
                        hilorama
                )
            }
        case types.hiloramaDelete:
            return {
                ...state,
                active: null,
                items: state.items.filter( hilorama => hilorama.id !== action.payload )
            }
        case types.hiloramaLogoutCleaning:
            return { 
                ...state,
                active: null,
                items: []
            }
        default:
           return state; 
    }
}