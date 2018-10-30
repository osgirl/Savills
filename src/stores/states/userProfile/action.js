import Types from './';
import Configs from '../../../utils/configs';

export function GetCurrentLoginInformations(accessTokenAPI) {
    return {
        type: Types.GET_UNITS,
        payload: {
            api: Configs.API + '/api/services/app/Session/GetCurrentLoginInformations',
            method: 'GET',
            token: accessTokenAPI
        }
    }
}
