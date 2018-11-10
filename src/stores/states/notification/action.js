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
