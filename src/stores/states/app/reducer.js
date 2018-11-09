import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listLanguege: {},
    languegeLocal : ''
});

export default createReducer(INIT_STATE, {
    
     [Types.SET_LANGUAGE_LOCAL_SUCCESS]: (state, action) => {
        let tempState = Object.assign({},
            { ...state },
            { languegeLocal: action.payload }
        );
        return tempState;
    },

    [Types.GET_LANGUAGE_LOCAL_SUCCESS]: (state, action) => {
        let tempState = Object.assign({},
            { ...state },
            { languegeLocal: action.payload }
        );
        return tempState;
    },


});