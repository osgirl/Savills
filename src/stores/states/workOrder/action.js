import Types from './';
import Configs from '../../../utils/configs';
let accessTokenAPIs =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg5NDc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImxlZW5ndXllbiIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiTVNKWVhGUkhER1hZNUtCNUxJU1JCUVFCTVBZTlMzSFciLCJHZW5kZXIiOiJNYWxlIiwiVW5pcXVlSWQiOiJhMmIyZmZkZC04ZTA4LTQ5NGEtYmY0OC04ODYwZDEyMDM4YjkiLCJJZENhcmQiOiIzMjEiLCJDb3VudHJ5Q29kZSI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiODk0NzQiLCJqdGkiOiI4MTQ5NzY1My1jM2I4LTQxMTItOTQ2My04NzA5ZTJhMjViYjciLCJpYXQiOjE1NDEwNDk2MTEsIm5iZiI6MTU0MTA0OTYxMSwiZXhwIjoxNTQzNjQxNjExLCJpc3MiOiJTUE1TLVZpZXRuYW0iLCJhdWQiOiJTUE1TLVZpZXRuYW0ifQ.UdFYTbtkzQTSv5ndrFArVKwJ59_c37lK85ZbnSZBucc';
export function getWorkOrderList(accessTokenAPI) {
  return {
    type: Types.GET_LIST_WORKORDER,
    payload: {
      api:
        Configs.API +
        '/api/workorders?sorting=dateCreate%20desc&memberId=89474&statusId=11&statusId=13&statusId=14&statusId=15&statusId=16&page=1&pageSize=10',
      method: 'GET',
      token: accessTokenAPIs
    }
  };
}

export function createWorkOrder(accessTokenAPI) {
  return {
    type: Types.CREATE_WORK_ORDER,
    payload: {
      api: Configs.API + '/api/services/app/WorkOrders/CreateWorkOrders',
      method: 'POST',
      payload: {
        currentStatusId: 11,
        fullUnitName: 'T1-A03-02 - Sep Leenguyen G',
        fullUnitCode: 'T1-A03-02',
        buildingId: 4,
        floorId: 4,
        unitId: 2,
        description: 'Thinh test 12j12l3j1l23j',
        sourceId: 3,
        maintainanceTeamId: 1,
        areaId: 50,
        categoryId: 90,
        subCategoryId: null,
        contact: {
          fullName: 'Sep Leenguyen G',
          phoneNumber: '0948044448',
          email: 'leenguyen1608@gmail.com',
          memberId: 89474
        },
        isPrivate: true
      },
      token: accessTokenAPIs
    }
  };
}

export function updateWorkOrder(accessTokenAPI) {
  return {
    type: Types.UPDATE_WORK_ORDER,
    payload: {
      api: Configs.API + '/api/services/app/WorkOrders/UpdateWorkorders?id=792',
      method: 'POST',
      token: accessTokenAPIs,
      payload: {
        currentStatusId: 11,
        fullUnitName: 'T1-A03-02 - Sep Leenguyen G',
        fullUnitCode: 'T1-A03-02',
        buildingId: 4,
        floorId: 4,
        unitId: 2,
        description: 'Thinh test 12j12l3j1l23j',
        sourceId: 3,
        maintainanceTeamId: 1,
        areaId: 50,
        categoryId: 90,
        subCategoryId: null,
        contact: {
          fullName: 'Sep Leenguyen G',
          phoneNumber: '0948044448',
          email: 'leenguyen1608@gmail.com',
          memberId: 89474
        },
        isPrivate: true
      }
    }
  };
}

export function detailWordOrder(accessTokenAPI, id) {
  return {
    type: Types.DETAIL_WORK_ORDER,
    payload: {
      api: Configs.API + '/api/services/app/WorkOrders/GetWoById?woId=' + id,
      method: 'GET',
      token: accessTokenAPIs
    }
  };
}

export function getListCategory(accessTokenAPI) {
  return {
    type: Types.GET_LIST_CATEGORY,
    payload: {
      api: Configs.API + '/api/WorkOrders/GetListCatType',
      method: 'GET',
      token: accessTokenAPIs
    }
  };
}
