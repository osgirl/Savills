import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listUserFee: {},
    history: {},
    detailHistory: {}
});

export default createReducer(INIT_STATE, {

    [Types.GET_LIST_USER_FEE]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_USER_FEE_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                listUserFee: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_USER_FEE_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listUserFee: {},
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.GET_LIST_HISTORY]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_HISTORY_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                history: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_HISTORY_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                history: {},
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.GET_DETAIL_HISTORY]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_DETAIL_HISTORY_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                detailHistory: action.response.result,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_DETAIL_HISTORY_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                detailHistory: {},
            };
        } catch (error) {
            console.log(error)
        }
    },

});