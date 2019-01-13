import Types from './';
import Configs from '../../../utils/linkApi';
import { lang } from 'moment';

export function getWorkOrderListActive(accessTokenAPI, memberId, pageCount = 1, lang) {
  return {
    type: Types.GET_LIST_WORKORDER_ACTIVE,
    payload: {
      api:
        Configs.API +
        `/api/workorders?sorting=dateCreate%20desc&memberId=${memberId}&statusId=11&statusId=13&statusId=14&statusId=15&statusId=16&page=${pageCount}&pageSize=15&groupStatus=ACTIVE&culture=${lang}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function getWorkOrderListComplete(accessTokenAPI, memberId, pageCount, langs) {
  return {
    type: Types.GET_LIST_WORKORDER_COMPLETE,
    payload: {
      api:
        Configs.API +
        `/api/workorders?sorting=dateCreate%20desc&memberId=${memberId}&statusId=11&statusId=13&statusId=14&statusId=15&statusId=16&page=${pageCount}&pageSize=15&groupStatus=COMPLETED&culture=${langs}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function getListArea(accessTokenAPI, lang) {
  return {
    type: Types.GET_LIST_AREA,
    payload: {
      api: Configs.API + `/api/services/app/WorkOrders/GetListCategory?culture=${lang}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function deleteImageWorkOrder(accessTokenAPI, id) {
  return {
    type: Types.DELETE_IMAGE_WORKORDER,
    payload: {
      api: Configs.API + `/api/File/DeleteFile?fileId=${id}`,
      method: 'DELETE',
      token: accessTokenAPI
    }
  };
}

export function createWorkOrder(accessTokenAPI, WorkOrder, lang) {
  return {
    type: Types.CREATE_WORK_ORDER,
    payload: {
      api: Configs.API + `/api/services/app/WorkOrders/CreateWorkOrders?culture=${lang}`,
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

export function updateWorkOrder(accessTokenAPI, WorkOrder, lang) {
  return {
    type: Types.UPDATE_WORK_ORDER,
    payload: {
      api: Configs.API + `/api/services/app/WorkOrders/UpdateWorkorders?id=${WorkOrder.id}&culture=${lang}`,
      method: 'PUT',
      token: accessTokenAPI,
      payload: {
        id: WorkOrder.id,
        guid: WorkOrder.guid,
        currentStatusId: WorkOrder.currentStatusId,
        createdUserFullName: WorkOrder.createdUserFullName,
        updateUserFullName: WorkOrder.updateUserFullName,
        rating: WorkOrder.rating,
        RatingComment: WorkOrder.RatingComment,
        fullUnitId: WorkOrder.fullUnitId,
        fullUnitName: WorkOrder.fullUnitName,
        fullUnitCode: WorkOrder.fullUnitCode,
        description: WorkOrder.description,
        sourceId: 3,
        dateCreate: WorkOrder.dateCreate,
        maintainanceTeamId: 1,
        areaId: WorkOrder.areaId,
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

export function detailWordOrder(accessTokenAPI, id, lang) {
  return {
    type: Types.DETAIL_WORK_ORDER,
    payload: {
      api: Configs.API + `/api/services/app/WorkOrders/GetWoById?woId=${id}&culture=${lang}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function getListCategory(accessTokenAPI, lang) {
  return {
    type: Types.GET_LIST_CATEGORY,
    payload: {
      api: Configs.API + `/api/WorkOrders/GetListCatType&culture=${lang == 0 ? 'en' : 'vi'}`,
      method: 'GET',
      token: accessTokenAPI
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

export function getCommentUnread(accessTokenAPI, id, idModules) {
  return {
    type: Types.GET_COMMENT_UNREAD,
    payload: {
      api: Configs.API + `/api/services/app/Notification/GetUserNotificationCommentUnread?entityIds=${id}&moduleId=${idModules}`,
      method: 'GET',
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
