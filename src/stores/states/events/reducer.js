import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    myEvents: {},
    eventsOfDate: {},
    overView: {}
});

export default createReducer(INIT_STATE, {
    [Types.GET_MY_EVENTS]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_MY_EVENTS_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                myEvents: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_MY_EVENTS_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                myEvents: {},
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.GET_EVENTS_OF_DATE]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_EVENTS_OF_DATE_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                eventsOfDate: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_EVENTS_OF_DATE_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                eventsOfDate: {},
            };
        } catch (error) {
            console.log(error)
        }
    },

    [Types.GET_OVERVIEW]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_OVERVIEW_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                overView: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_OVERVIEW_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                overView: {},
            };
        } catch (error) {
            console.log(error)
        }
    },

});