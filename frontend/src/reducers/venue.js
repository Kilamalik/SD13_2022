import { GET_VENUE, GET_VENUES, VENUE_ERROR, LOADING_TRUE } from "../actions/types";

const initialState = {
    venue: null,
    loading: true,
    venues: [],
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_VENUE:
            return {
                ...state,
                venue: payload,
                loading: false
            }
        case LOADING_TRUE:
            return {
                ...state,
                loading: true
            }
        case GET_VENUES:
            return {
                ...state,
                venue: null,
                loading: false,
                venues: payload,
            }
        case VENUE_ERROR:
            return {
                ...state,
                error: payload,
            }
        default: 
            return state;
    }
}