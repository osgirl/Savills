import Types from './';
import Configs from '../../../utils/configs';

export function getListUserFees(accessTokenAPI, fullUnitCode = '') {
    return {
        type: Types.GET_LIST_USER_FEE,
        payload: {
            api: Configs.API + `/api/Fees/fees/userfees?fullUnitCode=${fullUnitCode}&statusIds=1&statusIds=3&page=1`,
            method: 'GET',
            token: accessTokenAPI
        }
    }
}

