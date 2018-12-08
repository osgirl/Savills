import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listUnits: {},
    unitActive: {},
    employeesByOu: {},
    statusGetUnit: 0,
    isGetlisUnit: true,
    setUnitDefault: {}

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
                isGetlisUnit: false
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

    [Types.SET_UNIT_DEFAULT]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.SET_UNIT_DEFAULT_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                setUnitDefault: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.SET_UNIT_DEFAULT_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                setUnitDefault: {}
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.GET_EMP_BYOU]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_EMP_BYOU_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                employeesByOu: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_EMP_BYOU_FAIL]: (state, action) => {
        try {
            return {
                ...state,
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

    // * SET_IS_GETUNIT
    [Types.SET_IS_GETUNIT]: (state, action) => {
        return {
            ...state,
            isGetlisUnit: action.payload
        };
    },




});