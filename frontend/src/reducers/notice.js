import {GET_NOTICE , GET_NOTICES ,NOTICE_ERROR} from '../actions/types';

const initialState = {
    notice : null,
    loading : true,
    notices : [],
    error : {},
};

export default function (state = initialState, action) {
    const {type, payload}= action;

    switch (type) {
        case GET_NOTICE:
            return{
                ...state,
                notice:payload,
                loading:false,
            };

        case GET_NOTICES:
            return{
                ...state,
                notice: null,
                loading: false,
                notices:payload,
            };

        case NOTICE_ERROR:
            return{
                ...state,
                error:payload,
            };
        default:
            return state;


    }
}