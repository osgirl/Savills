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

export function getListHistory(accessTokenAPI, fullUnitCode = '', page = 1, pageSize = 10) {
    return {
        type: Types.GET_LIST_HISTORY,
        payload: {
            api: Configs.API + `/api/Fees/fees/receiptfilters?fullUnitCode=${fullUnitCode}&page=${page}&pageSize=${pageSize}`,
            method: 'GET',
            token: accessTokenAPI
        }
    }
}

export function getDetailHistory(accessTokenAPI, receiptId = 0) {
    return {
        type: Types.GET_DETAIL_HISTORY,
        payload: {
            api: Configs.API + `/api/services/app/FeesAppServices/GetReceiptForResident?receiptId=${receiptId}`,
            method: 'GET',
            token: accessTokenAPI
        }
    }
}


export function createOrder(accessTokenAPI, DeviceTypeId = 1, listDetailID) {
    return {
        type: Types.CREATE_ORDER,
        payload: {
            api: Configs.API + `/api/services/app/Payment/CreateOrderMobile`,
            method: 'POST',
            token: accessTokenAPI,
            DeviceTypeId,
            payload: {
                feeDetailIds: listDetailID
            }
        }
    }
}

export function getOrderId(accessTokenAPI, orderId = 0, language = 'en') {
    return {
        type: Types.GET_ORDER_ID,
        payload: {
            api: Configs.API + `/api/services/app/Payment/GetOrder?orderId=${orderId}&culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}


