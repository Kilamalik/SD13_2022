import { GET_LEAVE, GET_LEAVES, LEAVE_ERROR, LOADING_TRUE } from "../actions/types";

const initialState = {
    leave: null,
    loading: true,
    leaves: [],
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_LEAVE:
            return {
                ...state,
                leave: payload,
                loading: false
            }
        case LOADING_TRUE:
            return {
                ...state,
                loading: true
            }
        case GET_LEAVES:
            return {
                ...state,
                leave: null,
                loading: false,
                leaves: payload,
            }
        case LEAVE_ERROR:
            return {
                ...state,
                error: payload,
            }
        default: 
            return state;
    }
}