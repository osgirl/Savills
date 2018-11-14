import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listInbox: { items: [], success: false },
    listInboxIsActive: { items: [], success: false },
    setInboxActive: {}
});

export default createReducer(INIT_STATE, {

    [Types.GET_LIST_INBOX]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_INBOX_SUCCESS]: (state, action) => {
        try {
            let tempState;
            let totalCount = action.response.result.totalCount;
            let data = [...state.listInbox.items]
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
                        listInbox: {
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

    [Types.GET_LIST_INBOX_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listInbox: {},
            };
        } catch (error) {
            console.log(error)
        }
    },

    [Types.GET_LIST_INBOX_ISACTIVE]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_INBOX_ISACTIVE_SUCCESS]: (state, action) => {
        try {
            let tempState;
            let totalCount = action.response.result.totalCount;
            let data = [...state.listInboxIsActive.items]
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
                        listInboxIsActive: {
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

    [Types.GET_LIST_INBOX_ISACTIVE_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listInboxIsActive: {},
            };
        } catch (error) {
            console.log(error)
        }
    },



    [Types.SET_INBOX_ACTIVE]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.SET_INBOX_ACTIVE_SUCCESS]: (state, action) => {
        try {
            let tempState;
            tempState = Object.assign(
                {},
                { ...state },
                {
                    setInboxActive: action.response
                },
            );
            return tempState;
        } catch (error) {
            console.log(error)
        }

    },

    [Types.SET_INBOX_ACTIVE_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                setInboxActive: {},
            };
        } catch (error) {
            console.log(error)
        }
    },

});