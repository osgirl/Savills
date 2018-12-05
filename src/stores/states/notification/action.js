import Types from './';
import Configs from '../../../utils/configs';

export function getListNotification(accessTokenAPI, start = 0, maxResult = 10) {
    return {
        type: Types.GET_LIST,
        payload: {
            api: Configs.API + `/api/services/app/Notification/GetUserNotifications?skipCount=${start}&maxResultCount=${maxResult}`,
            method: 'GET',
            token: accessTokenAPI
        }
    }
}

export function getListCountModule(accessTokenAPI, unitID) {
    return {
        type: Types.GET_COUNT_MODULE,
        payload: {
            api: Configs.API + `/api/services/app/Notification/GetUserModuleCount?unitId=${unitID}`,
            method: 'GET',
            token: accessTokenAPI
        }
    }
}

export function updateRead(accessTokenAPI, notyId) {
    return {
        type: Types.UPDATE_READ,
        payload: {
            api: Configs.API + `/api/services/app/Notification/SetNotificationAsRead`,
            method: 'POST',
            token: accessTokenAPI,
            payload: {
                id: notyId
            }
        }
    }
}


