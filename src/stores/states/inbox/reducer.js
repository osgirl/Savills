import Types from './';
import createReducer from '../';

const INIT_STATE = ({
    listInbox: { items: [], success: false, totalCount: null },
    listInboxFromManager: { items: [], success: false, totalCount: null },
    listInboxToManager: { items: [], success: false, totalCount: null },
    listInboxIsActive: { items: [], success: false, totalCount: null },
    setInboxActive: false,
    addInbox: {},
    statusSetinbox: 0,
    detailInbox: {},
    setRead: {},
    listComment: {},
    commentUnread: {},
    addComment: {},
});

export default createReducer(INIT_STATE, {

    [Types.ADD_INBOX]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.ADD_INBOX_SUCCESS]: (state, action) => {
        try {
            let tempState;
            tempState = Object.assign(
                {},
                { ...state },
                {
                    addInbox: action.response
                },
            );
            return tempState;
        } catch (error) {
            console.log(error)
        }

    },

    [Types.ADD_INBOX_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                addInbox: {},
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.GET_LIST_INBOX_TO_MANAGER]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_INBOX_TO_MANAGER_SUCCESS]: (state, action) => {
        try {
            let tempState;
            tempState = Object.assign(
                {},
                { ...state },
                {
                    listInboxToManager: {
                        items: action.response.result.items,
                        success: action.response.success,
                        totalCount: action.response.result.totalCount
                    },
                },
            );
            return tempState;
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_INBOX_TO_MANAGER_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listInboxToManager: {},
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.GET_LIST_INBOX_FROM_MANAGER]: (state, action) => {
        try {
            return {
                ...state
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_INBOX_FROM_MANAGER_SUCCESS]: (state, action) => {
        try {
            let tempState;
            tempState = Object.assign(
                {},
                { ...state },
                {
                    listInboxFromManager: {
                        items: action.response.result.items,
                        success: action.response.success,
                        totalCount: action.response.result.totalCount
                    },
                },
            );
            return tempState;
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_LIST_INBOX_FROM_MANAGER_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                listInboxFromManager: {},
            };
        } catch (error) {
            console.log(error)
        }
    },

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
            tempState = Object.assign(
                {},
                { ...state },
                {
                    listInbox: {
                        items: action.response.result.items,
                        success: action.response.success,
                        totalCount: action.response.result.totalCount
                    },
                },
            );
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
            tempState = Object.assign(
                {},
                { ...state },
                {
                    listInboxIsActive: {
                        items: action.response.result.items,
                        success: action.response.success,
                        totalCount: action.response.result.totalCount
                    },
                },
            );
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
                ...state,
                setInboxActive: false
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
                    setInboxActive: action.response.success,
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
                setInboxActive: false,
            };
        } catch (error) {
            console.log(error)
        }
    },



    [Types.GET_DETAIL]: (state, action) => {
        try {
            return {
                ...state,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_DETAIL_SUCCESS]: (state, action) => {
        try {
            let tempState;
            tempState = Object.assign(
                {},
                { ...state },
                {
                    detailInbox: action.response,
                },
            );
            return tempState;
        } catch (error) {
            console.log(error)
        }

    },

    [Types.GET_DETAIL_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                detailInbox: {},
            };
        } catch (error) {
            console.log(error)
        }
    },


    [Types.SET_READ_INBOX]: (state, action) => {
        try {
            return {
                ...state,
            };
        } catch (error) {
            console.log(error)
        }

    },

    [Types.SET_READ_INBOX_SUCCESS]: (state, action) => {
        try {
            let tempState;
            tempState = Object.assign(
                {},
                { ...state },
                {
                    setRead: action.response,
                },
            );
            return tempState;
        } catch (error) {
            console.log(error)
        }

    },

    [Types.SET_READ_INBOX_FAIL]: (state, action) => {
        try {
            return {
                ...state,
                setRead: {},
            };
        } catch (error) {
            console.log(error)
        }
    },

    // comment
    [Types.GET_COMMENT_USER_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                listComment: action.response
            };
        } catch (error) {
            console.log(error);
        }
    },

    [Types.GET_COMMENT_UNREAD_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                commentUnread: action.response
            };
        } catch (error) {
            console.log(error);
        }
    },

    [Types.ADD_COMMENT_USER_SUCCESS]: (state, action) => {
        try {
            return {
                ...state,
                addComment: action.response
            };
        } catch (error) {
            console.log(error);
        }
    },

});