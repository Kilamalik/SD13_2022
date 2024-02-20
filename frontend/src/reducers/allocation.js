import { GET_TIMETABLE, GET_TIMETABLES, TIMETABLE_ERROR, LOADING_TRUE } from "../actions/types";

const initialState = {
    timetable1: null,
    loading: true,
    timetables: [],
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_TIMETABLE:
            return {
                ...state,
                timetable1: payload,
                loading: false
            }
        case LOADING_TRUE:
            return {
                ...state,
                loading: true
            }
        case GET_TIMETABLES:
            return {
                ...state,
                timetable1: null,
                loading: false,
                timetables: payload,
            }
        case TIMETABLE_ERROR:
            return {
                ...state,
                error: payload,
            }
        default: 
            return state;
    }
}