import Types from './';
import Configs from '../../../utils/configs';

export function getListInbox(accessTokenAPI, language = 'en', page = 1, pageSize = 10) {
    return {
        type: Types.GET_LIST_INBOX,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/GetInboxes?page=${page}&pageSize=${pageSize}&isInactive=false&culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function getListInboxIsActive(accessTokenAPI, language = 'en', page = 1, pageSize = 10) {
    return {
        type: Types.GET_LIST_INBOX_ISACTIVE,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/GetInboxes?page=${page}&pageSize=${pageSize}&isInactive=true&culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function getInboxFromManagement(accessTokenAPI, language = 'en', page = 1, pageSize = 10) {
    return {
        type: Types.GET_LIST_INBOX_FROM_MANAGER,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/GetInboxFromManagement?page=${page}&pageSize=${pageSize}&isInactive=false&culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function getInboxToManagement(accessTokenAPI, language = 'en', page = 1, pageSize = 10) {
    return {
        type: Types.GET_LIST_INBOX_TO_MANAGER,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/GetInboxToManagement?page=${page}&pageSize=${pageSize}&culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function setInboxActive(accessTokenAPI, language = 'en', inboxId = 0) {
    return {
        type: Types.SET_INBOX_ACTIVE,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/Archive?InboxId=${inboxId}&culture=${language}`,
            method: 'POST',
            token: accessTokenAPI,
        }
    }
}

export function getDetail(accessTokenAPI, language = 'en', inboxId = 0) {
    return {
        type: Types.GET_DETAIL,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/GetInboxDetails?inboxId=${inboxId}&culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function setInboxRead(accessTokenAPI, language = 'en', inboxId = 0) {
    return {
        type: Types.SET_READ_INBOX,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/SetInboxAsRead?inboxId=${inboxId}&culture=${language}`,
            method: 'POST',
            token: accessTokenAPI,
        }
    }
}

export function addInbox(accessTokenAPI, subject = '', content = '') {
    return {
        type: Types.ADD_INBOX,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/AddInbox`,
            method: 'POST',
            token: accessTokenAPI,
            payload: {
                subject,
                content
            }
        }
    }
}

// comment
export function getCommentUser(accessTokenAPI, language, conversationId) {
    return {
        type: Types.GET_COMMENT_USER,
        payload: {
            api: Configs.API_COMMON + `/api/conversations?conversationId=${conversationId}&isPrivate=false&culture=${language}`,
            method: 'GET',
            token: accessTokenAPI
        }
    };
}

export function getCommentUnread(accessTokenAPI, id, idModules) {
    return {
        type: Types.GET_COMMENT_UNREAD,
        payload: {
            api: Configs.API + `/api/services/app/Notification/GetUserNotificationCommentUnread?entityIds=${id}&moduleId=${idModules}`,
            method: 'GET',
            token: accessTokenAPI
        }
    };
}

export function addCommentUser(accessTokenAPI, comment) {
    return {
        type: Types.ADD_COMMENT_USER,
        payload: {
            api: Configs.API_COMMON + '/api/conversations',
            method: 'POST',
            payload: {
                conversationId: comment.conversationId,
                content: comment.content,
                typeId: null,
                isPrivate: false,
                userName: comment.userName,
                profilePictureId: comment.profilePictureId,
                moduleId: comment.moduleId
            },
            token: accessTokenAPI
        }
    };
}



