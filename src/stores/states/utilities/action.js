import Types from './';
import Configs from '../../../utils/configs';

export function getFAQ(accessTokenAPI) {
    return {
        type: Types.GET_FAQ,
        payload: {
            api: Configs.API + '/api/services/app/Utilities/GetFAQ',
            method: 'GET',
            token: accessTokenAPI
        }
    }
}

