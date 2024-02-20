import { GET_MODULE, GET_MODULES, MODULE_ERROR, LOADING_TRUE } from "../actions/types";

const initialState = {
    module: null,
    loading: true,
    modules: [],
    error: {}
}

export default function (state = initialState, action) {
    const { type, payload } = action;

    switch(type) {
        case GET_MODULE:
            return {
                ...state,
                module: payload,
                loading: false
            }
        case LOADING_TRUE:
            return {
                ...state,
                loading: true
            }
        case GET_MODULES:
            return {
                ...state,
                module: null,
                loading: false,
                modules: payload,
            }
        case MODULE_ERROR:
            return {
                ...state,
                error: payload,
            }
        default: 
            return state;
    }
}