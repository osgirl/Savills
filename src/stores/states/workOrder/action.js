import Types from './';
import Configs from '../../../utils/configs';
let accessTokenAPIs =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijk5NTE4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ijg0NGM1ZTY5ZjczMDQwZjhhNjZkZWFlYTQwMjczZmY5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJMTVJZVFNPWUNNT0FWT0hETkY0RldWUzVZU1E2TlA2RSIsIkpvYlRpdGxlIjoiQWRtaW4iLCJVbmlxdWVJZCI6Ijg0NGM1ZTY5LWY3MzAtNDBmOC1hNjZkLWVhZWE0MDI3M2ZmOSIsIkRhdGVPZkJpcnRoIjoiMS8zMS8xOTk1IDU6MDA6MDAgUE0iLCJDb250cmFjdERhdGUiOiIxMC85LzIwMTggNTowMDowMCBQTSIsIkNvbnRyYWN0RXhwaXJlZERhdGUiOiIxMS8zMC8yMDE4IDU6MDA6MDAgUE0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiRW1wbG95ZWUiLCJBZG1pbiJdLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiOTk1MTgiLCJqdGkiOiIxMGM5NzRjOC03NjJlLTQ0YjYtODAzNi05NmUwYjE3YTcxMjEiLCJpYXQiOjE1NDE0MDE0MDIsIm5iZiI6MTU0MTQwMTQwMiwiZXhwIjoxNTQzOTkzNDAyLCJpc3MiOiJTUE1TLVZpZXRuYW0iLCJhdWQiOiJTUE1TLVZpZXRuYW0ifQ.PgZJbuWvw9Al8SQcTQuTdQoPzp2wegPSQfabH-kpr9o';
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

export function createWorkOrder(accessTokenAPI, WorkOrder) {
  return {
    type: Types.CREATE_WORK_ORDER,
    payload: {
      api: Configs.API + '/api/services/app/WorkOrders/CreateWorkOrders',
      method: 'POST',
      payload: {
        currentStatusId: WorkOrder.currentStatusId,
        fullUnitName: WorkOrder.fullUnitName,
        fullUnitCode: WorkOrder.fullUnitCode,
        buildingId: WorkOrder.buildingId,
        floorId: WorkOrder.floorId,
        unitId: WorkOrder.unitId,
        description: WorkOrder.description,
        sourceId: WorkOrder.sourceId,
        maintainanceTeamId: WorkOrder.maintainanceTeamId,
        areaId: WorkOrder.areaId,
        categoryId: WorkOrder.categoryId,
        subCategoryId: null,
        contact: {
          fullName: WorkOrder.contact.fu,
          phoneNumber: WorkOrder.contact.phoneNumber,
          email: WorkOrder.contact.email,
          memberId: WorkOrder.contact.memberId
        },
        isPrivate: true
      },
      token: accessTokenAPI
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

export function getCommentUser(accessTokenAPI) {
  return {
    type: Types.GET_COMMENT_USER,
    payload: {
      api: Configs.API_COMMON + '/api/conversations?conversationId=8aab99fa-0400-4c9d-bb3e-9628aba1212d&isPrivate=false',
      method: 'GET',
      token: accessTokenAPIs
    }
  };
}

export function addCommentUser(accessTokenAPI) {
  return {
    type: Types.ADD_COMMENT_USER,
    payload: {
      api: Configs.API_COMMON + '/api/conversations',
      method: 'POST',
      payload: {
        conversationId: '8aab99fa-0400-4c9d-bb3e-9628aba1212d',
        content: '12,3,4,5',
        typeId: null,
        isPrivate: false,
        userName: 'Leenguyen G (RESIDENT)',
        profilePictureId: 'b47d2538-b972-b242-ac4c-39e9f1588c72',
        moduleId: 2
      },
      token: accessTokenAPIs
    }
  };
}

export function uploadImageWorkOrder(accessTokenAPI, file, idWO) {
  return {
    type: Types.UPDATE_IMAGE_WORKORDER,
    payload: {
      api: Configs.API_UPLOAD_IMAGE + '/api/File/UploadFileWO?woId=' + idWO,
      method: 'POST',
      payload: {
        description: 'NOTHING',
        fileName: '220px-Savills_logo.svg.png',
        mimeType: 'image/png',
        fileToUpload: file
      },
      token: accessTokenAPI
    }
  };
}

export function setFlagCreateWorkOrder(bool = true) {
  return {
    type: Types.FLAG_CREATE_WORKORDER,
    payload: bool
  };
}
