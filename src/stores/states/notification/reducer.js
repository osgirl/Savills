import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listNoti: { items: [], success: false },
});

export default createReducer(INIT_STATE, {
    [Types.GET_LIST]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_SUCCESS]: (state, action) => {
        try {
            let tempState;
            let totalCount = action.response.result.totalCount;
            let data = [...state.listNoti.items]
            if (data.length >= totalCount) {
                tempState = Object.assign(
                    {},
                    { ...state },
                );
            } else {
                tempState = Object.assign(
                    {},
                    { ...state },
                    {
                        listNoti: {
                            items: action.response.result.items,
                            success: action.response.success
                        },
                    },
                );
            }
            return tempState;
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listNoti: { items: [], success: false },
            };
        } catch (error) {
            console.log(error)
        }
    },



});