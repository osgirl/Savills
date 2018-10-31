import Types from './';
import Configs from '../../../utils/configs';

export function getCurrentLoginInformations(accessTokenAPI) {
    return {
        type: Types.GET_USER_INFORMATION,
        payload: {
            api: Configs.API + '/api/services/app/Session/GetCurrentLoginInformations',
            method: 'GET',
            token: accessTokenAPI
        }
    }
}

export function getImageUserProfile(accessTokenAPI) {
    return {
        type: Types.GET_IMAGE_USER,
        payload: {
            api: Configs.API + '/api/services/app/Profile/GetProfilePicture',
            method: 'GET',
            token: accessTokenAPI
        }
    }
}
