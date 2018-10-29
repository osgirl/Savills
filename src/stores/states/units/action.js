import Types from './';
import Configs from '../../../utils/configs';

export function getUnits(accessTokenAPI) {
    return {
        type: Types.GET_UNITS,
        payload: {
            api: Configs.API + '/units/UnitsByMember',
            method: 'GET',
            token: accessTokenAPI
        }
    }
}


export function setUnitLocal(data) {
    return {
        type: Types.SET_UNITLOCAL,
        payload: {
            storage: {
                key: 'UNITLOCAL',
                type: 'setArrayObject',
                data: data
            }
        }
    }
}

export function getUnitLocal() {
    return {
        type: Types.GET_UNITLOCAL,
        payload: {
            storage: {
                key: 'UNITLOCAL',
                type: 'getArrayObject',
            }
        }
    }
}