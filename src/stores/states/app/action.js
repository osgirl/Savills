import Types from './';
import Configs from '../../../utils/configs';

export function getLanguage(accessTokenAPI) {
    return {
        type: Types.GET_LANGUAGE,
        payload: {
            // api: Configs.API_BOOKING + `/api/events/myevents?buildingId=${buildingId}&fromDate=${fromDate}&toDate=${toDate}`,
            // method: 'GET',
            // token: accessTokenAPI,
        }
    }
}

export function setLanguageLocal(data) {
    return {
        type: Types.SET_LANGUAGE_LOCAL,
        payload: {
            storage: {
                key: 'LANGUAGE_LOCAL',
                type: 'setString',
                data: data
            }
        }
    }
}

export function getLanguageLocal() {
    return {
        type: Types.GET_LANGUAGE_LOCAL,
        payload: {
            storage: {
                key: 'LANGUAGE_LOCAL',
                type: 'getString',
            }
        }
    }
}