import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listUnits: {},
    unitActive: {},
    statusGetUnit: 0

});

export default createReducer(INIT_STATE, {
    [Types.GET_UNITS]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_UNITS_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                listUnits: action.response,
                statusGetUnit: 100
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_UNITS_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listUnits: {}
            };
        } catch (error) {
            console.log(error)
        }
    },


    // * SET_GET_UNITLOCAL
    [Types.SET_UNITLOCAL_SUCCESS]: (state, action) => {
        let tempState = Object.assign({},
            { ...state },
            { unitActive: action.payload }
        );
        return tempState;
    },

    [Types.GET_UNITLOCAL_SUCCESS]: (state, action) => {
        let tempState = Object.assign({},
            { ...state },
            { unitActive: action.payload }
        );
        return tempState;
    },



});