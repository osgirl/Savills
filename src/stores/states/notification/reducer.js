import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listNoti: { items: [], success: false },
    unreadCount: 0,
    listCountModule: {},
    updateRead: {}
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
                        unreadCount: action.response.result.unreadCount
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
                unreadCount: 0
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.GET_COUNT_MODULE]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_COUNT_MODULE_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                listCountModule: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_COUNT_MODULE_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listNoti: { items: [], success: false },
                unreadCount: 0
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.UPDATE_READ]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.UPDATE_READ_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                updateRead: action.response,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.UPDATE_READ_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                updateRead: {},
            };
        } catch (error) {
            console.log(error)
        }
    },



});