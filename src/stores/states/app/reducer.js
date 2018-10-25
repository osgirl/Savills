import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    test: ""
});

export default createReducer(INIT_STATE, {
    [Types.TEST]: (state, action) => {        
        return {
            ...state,
            test : action.payload.data
        };
    },

    // [Types.TEST_SUCCESS]: (state, action) => {
        
    //     return {
    //         ...state,
    //         test: action.payload.data
    //     };
    // },

    // [Types.TEST_FAIL]: (state, action) => {
    //     return {
    //         ...state,
    //     };
    // },
});