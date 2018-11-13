import Types from './';
import Configs from '../../../utils/configs';

export function getListInbox(accessTokenAPI, page = 1, pageSize = 10) {
    return {
        type: Types.GET_LIST_INBOX,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/GetInboxes?page=${page}&pageSize=${pageSize}&isInactive=false`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function getListInboxIsActive(accessTokenAPI, page = 1, pageSize = 10) {
    return {
        type: Types.GET_LIST_INBOX_ISACTIVE,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/GetInboxes?page=${page}&pageSize=${pageSize}&isInactive=true`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function setInboxActive(accessTokenAPI, inboxId = 0) {
    return {
        type: Types.SET_INBOX_ACTIVE,
        payload: {
            api: Configs.API + `/api/services/app/InboxUsers/Archive?InboxId=${inboxId}`,
            method: 'POST',
            token: accessTokenAPI,
        }
    }
}


