import Types from './';
import Configs from '../../../utils/configs';
let accessTokenAPIs =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijk5NTE4IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ijg0NGM1ZTY5ZjczMDQwZjhhNjZkZWFlYTQwMjczZmY5IiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiJMTVJZVFNPWUNNT0FWT0hETkY0RldWUzVZU1E2TlA2RSIsIkpvYlRpdGxlIjoiQWRtaW4iLCJVbmlxdWVJZCI6Ijg0NGM1ZTY5LWY3MzAtNDBmOC1hNjZkLWVhZWE0MDI3M2ZmOSIsIkRhdGVPZkJpcnRoIjoiMS8zMS8xOTk1IDU6MDA6MDAgUE0iLCJDb250cmFjdERhdGUiOiIxMC85LzIwMTggNTowMDowMCBQTSIsIkNvbnRyYWN0RXhwaXJlZERhdGUiOiIxMS8zMC8yMDE4IDU6MDA6MDAgUE0iLCJodHRwOi8vc2NoZW1hcy5taWNyb3NvZnQuY29tL3dzLzIwMDgvMDYvaWRlbnRpdHkvY2xhaW1zL3JvbGUiOlsiRW1wbG95ZWUiLCJBZG1pbiJdLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiOTk1MTgiLCJqdGkiOiIxMGM5NzRjOC03NjJlLTQ0YjYtODAzNi05NmUwYjE3YTcxMjEiLCJpYXQiOjE1NDE0MDE0MDIsIm5iZiI6MTU0MTQwMTQwMiwiZXhwIjoxNTQzOTkzNDAyLCJpc3MiOiJTUE1TLVZpZXRuYW0iLCJhdWQiOiJTUE1TLVZpZXRuYW0ifQ.PgZJbuWvw9Al8SQcTQuTdQoPzp2wegPSQfabH-kpr9o';
export function getWorkOrderList(accessTokenAPI, sort, memberId) {
  return {
    type: Types.GET_LIST_WORKORDER,
    payload: {
      api:
        Configs.API +
        `/api/workorders?sorting=dateCreate%20desc&memberId=${memberId}&statusId=11&statusId=13&statusId=14&statusId=15&statusId=16&page=0&pageSize=20&groupStatus=${sort}`,
      method: 'GET',
      sort: sort,
      token: accessTokenAPI
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
          fullName: WorkOrder.contact.fullName,
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

export function updateWorkOrder(accessTokenAPI, WorkOrder) {
  return {
    type: Types.UPDATE_WORK_ORDER,
    payload: {
      api: Configs.API + '/api/services/app/WorkOrders/UpdateWorkorders?id=' + WorkOrder.id,
      method: 'PUT',
      token: accessTokenAPI,
      payload: {
        id: WorkOrder.id,
        guid: WorkOrder.guid,
        currentStatusId: WorkOrder.currentStatusId,
        createdUserFullName: WorkOrder.createdUserFullName,
        updateUserFullName: WorkOrder.updateUserFullName,
        rating: WorkOrder.rating,
        fullUnitId: WorkOrder.fullUnitId,
        fullUnitName: WorkOrder.fullUnitName,
        fullUnitCode: WorkOrder.fullUnitCode,
        description: WorkOrder.description,
        sourceId: 3,
        dateCreate: WorkOrder.dateCreate,
        maintainanceTeamId: 1,
        areaId: 50,
        categoryId: 90,
        isPrivate: true,
        contact: {
          email: WorkOrder.contact.email,
          memberId: WorkOrder.contact.memberId,
          phoneNumber: WorkOrder.contact.phoneNumber
        }
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
      token: accessTokenAPI
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

export function getCommentUser(accessTokenAPI, conversationId) {
  return {
    type: Types.GET_COMMENT_USER,
    payload: {
      api: Configs.API_COMMON + `/api/conversations?conversationId=${conversationId}&isPrivate=false`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function addCommentUser(accessTokenAPI, comment) {
  return {
    type: Types.ADD_COMMENT_USER,
    payload: {
      api: Configs.API_COMMON + '/api/conversations',
      method: 'POST',
      payload: {
        conversationId: comment.conversationId,
        content: comment.content,
        typeId: null,
        isPrivate: false,
        userName: comment.userName,
        profilePictureId: comment.profilePictureId,
        moduleId: comment.moduleId
      },
      token: accessTokenAPI
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

export function setFlagGetWorkOrderList(bool = true) {
  return {
    type: Types.FLAG_GET_WORKORDER_LIST,
    payload: bool
  };
}

export function setFlagUpdateWorkOrder(bool = true) {
  return {
    type: Types.FLAG_UPDATE_WORKODER,
    payload: bool
  };
}
