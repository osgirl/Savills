import Types from './';
import Configs from '../../../utils/configs';
export function getListDelivery(accessTokenAPI) {
  return {
    type: Types.GET_LIST_DELIVERY,
    payload: {
      api: Configs.API + `/api/Deliveries/filters?sorting=id%20desc&residentId=89474&page=1&pageSize=10`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function getDetailDelivery(accessTokenAPI, id) {
  return {
    type: Types.GET_DETAIL_DELIVERY,
    payload: {
      api: Configs.API + `/api/services/app/DeliveriesAppServices/GetResidentDeliveryDetail?deliveryId=${id}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

// get list introducstion
export function getListIntrustion(accessTokenAPI) {
  return {
    type: Types.GET_LIST_INTRUSTION,
    payload: {
      api: Configs.API + `/api/Instrustions/filters?sorting=id%20desc&residentId=89474&page=1&pageSize=10`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

// get detail introdustion
export function getDetailIntrustion(accessTokenAPI, id) {
  return {
    type: Types.GET_DETAIL_INTRUSTION,
    payload: {
      api: Configs.API + `/api/services/app/InstructionsAppServices/GetResidentInstruction?instructionId=${id}&culture=en`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

// create introdustion
export function createIntrustion(accessTokenAPI) {
  return {
    type: Types.CREATE_INTRUSTION,
    payload: {
      api: Configs.API + `/api/services/app/InstructionsAppServices/CreateResidentInstruction`,
      method: 'POST',
      payload: {
        unitId: 3,
        fullUnitCode: 'T1-A03-03',
        displayName: 'Nguyen Huy',
        email: 'leenguyen1608@gmail.com',
        instructionTypeId: '31',
        statusId: null,
        instructionText: 'asfda',
        startDate: '2018-08-30T10:44:48.000Z',
        endDate: '2018-08-31T10:44:48.000Z'
      },
      token: accessTokenAPI
    }
  };
}

// edit introdustion
export function editIntrustion(accessTokenAPI) {
  return {
    type: Types.EDIT_INTRUSTION,
    payload: {
      api: Configs.API + `/api/services/app/InstructionsAppServices/CreateResidentInstruction`,
      method: 'POST',
      payload: {
        unitId: 3,
        fullUnitCode: 'T1-A03-03',
        displayName: 'Nguyen Huy',
        email: 'leenguyen1608@gmail.com',
        instructionTypeId: '31',
        statusId: null,
        instructionText: 'asfda',
        startDate: '2018-08-30T10:44:48.000Z',
        endDate: '2018-08-31T10:44:48.000Z'
      },
      token: accessTokenAPI
    }
  };
}

// flag get list frontDesk
export function setFlagGetListDelivery(bool = true) {
  return {
    type: Types.FLAG_GET_DELIVERY,
    payload: bool
  };
}

// flag get list frontDesk
export function setFlagGetListIntrodustion(bool = true) {
  return {
    type: Types.FLAG_GET_INTRODUCTION,
    payload: bool
  };
}
