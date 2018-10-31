import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    profile: {},
    imageProfile: ''
});

export default createReducer(INIT_STATE, {
    [Types.GET_USER_INFORMATION]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_USER_INFORMATION_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                profile: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_USER_INFORMATION_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                profile: {},
            };
        } catch (error) {
            console.log(error)
        }
    },
    [Types.GET_IMAGE_USER]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_IMAGE_USER_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                imageProfile: action.response
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_IMAGE_USER_FAIL]: (state, action) => {
        try {
            return {
                ...state,
            };
        } catch (error) {
            console.log(error)
        }
    },


    // // * SET_GET_UNITLOCAL
    // [Types.SET_UNITLOCAL_SUCCESS]: (state, action) => {
    //     let tempState = Object.assign({},
    //         { ...state },
    //         { unitActive: action.payload }
    //     );
    //     return tempState;
    // },

    // [Types.GET_UNITLOCAL_SUCCESS]: (state, action) => {
    //     let tempState = Object.assign({},
    //         { ...state },
    //         { unitActive: action.payload }
    //     );
    //     return tempState;
    // },



});