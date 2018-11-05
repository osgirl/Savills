import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    FAQ: {},
});

export default createReducer(INIT_STATE, {
    [Types.GET_FAQ]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_FAQ_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                FAQ: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_FAQ_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                FAQ: {},
            };
        } catch (error) {
            console.log(error)
        }
    },



});