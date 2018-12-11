import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listLibary: { items: [], success: false, totalCount: null },
    detaiLibary: {}
});

export default createReducer(INIT_STATE, {

    [Types.GET_LIST_LIBARY]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_LIBARY_SUCCESS]: (state, action) => {
        try {
            let tempState;
            tempState = Object.assign(
                {},
                { ...state },
                {
                    listLibary: action.response,
                },
            );
            return tempState;
        } catch (error) {
            console.log(error)
        }
    },

    [Types.GET_LIST_LIBARY_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listLibary: {},
            };
        } catch (error) {
            console.log(error)
        }
    },

    [Types.GET_DETAIL]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_DETAIL_SUCCESS]: (state, action) => {
        try {
            let tempState;
            tempState = Object.assign(
                {},
                { ...state },
                {
                    detaiLibary: action.response,
                },
            );
            return tempState;
        } catch (error) {
            console.log(error)
        }
    },

    [Types.GET_DETAIL_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                detaiLibary: {},
            };
        } catch (error) {
            console.log(error)
        }
    },
});