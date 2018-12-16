import Types from './';
import Configs from '../../../utils/configs';

export function getListFeedback(accessTokenAPI, pageCount = 1, language = 'en', pageSize = 10) {
  return {
    type: Types.GET_LIST_FEEDBACK,
    payload: {
      api: Configs.API_BOOKING + `/api/commentboxes/my-commentboxes?page=${pageCount}&pageSize=${pageSize}&culture=${language}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function getDetail(accessTokenAPI, commentBoxID) {
  return {
    type: Types.GET_DETAIL,
    payload: {
      api: Configs.API_BOOKING + `/api/commentboxes?commentBoxId=${commentBoxID}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function getListCategory(accessTokenAPI, language = 'en') {
  return {
    type: Types.GET_LIST_CATEGORY,
    payload: {
      api: Configs.API_BOOKING + `/api/commentboxes/categories?culture=${language}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function getTypeFeedback(accessTokenAPI, language = 'en') {
  return {
    type: Types.GET_LIST_TYPE_FEEDBACK,
    payload: {
      api: Configs.API_BOOKING + `/api/commentboxes/types?culture=${language}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function updateStatus(accessTokenAPI, id = 0, statusCode = "DELETED", language = 'en') {
  return {
    type: Types.UPDATE_STATUS,
    payload: {
      api: Configs.API_BOOKING + `/api/commentboxes/${id}?culture=${language}`,
      method: 'PUT',
      token: accessTokenAPI,
      payload: {
        id,
        statusCode,
      }
    }
  };
}

export function createFeedback(
  accessTokenAPI,
  commentBoxSourceId = 0,
  buildingId = 0,
  userId = 0,
  userName = '',
  unitId = 0,
  fullUnitCode = '',
  commentBoxCategoryId = 0,
  description = '',
  commentBoxType = ''
) {
  return {
    type: Types.CREATE_FEEDBACK,
    payload: {
      api: Configs.API_BOOKING + `/api/commentboxes/member?culture=en`,
      method: 'POST',
      token: accessTokenAPI,
      payload: {
        commentBoxNature: 'INDIVIDUAL',
        commentBoxSourceId: commentBoxSourceId,
        buildingId: buildingId,
        userId: userId,
        userName: userName,
        unitId: unitId,
        fullUnitCode: fullUnitCode,
        commentBoxProjectType: 'PROJECT',
        commentBoxCategoryId: commentBoxCategoryId,
        description: description,
        commentBoxType: commentBoxType
      }
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
