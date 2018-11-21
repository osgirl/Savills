import Types from './';
import Configs from '../../../utils/configs';

export function getListFeedback(accessTokenAPI, pageCount = 1, language = 'en', pageSize = 10) {
    return {
        type: Types.GET_LIST_FEEDBACK,
        payload: {
            api: Configs.API_BOOKING + `/api/commentboxes/my-commentboxes?page=${pageCount}&pageSize=${pageSize}&culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function getListCategory(accessTokenAPI, language = 'en') {
    return {
        type: Types.GET_LIST_CATEGORY,
        payload: {
            api: Configs.API_BOOKING + `/api/commentboxes/categories?culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}


export function getTypeFeedback(accessTokenAPI, language = 'en') {
    return {
        type: Types.GET_LIST_TYPE_FEEDBACK,
        payload: {
            api: Configs.API_BOOKING + `/api/commentboxes/types?culture=${language}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function createFeedback(accessTokenAPI, commentBoxSourceId = 0, buildingId = 0, userId = 0, userName = '', unitId = 0, fullUnitCode = '',commentBoxCategoryId= 0, description = '',commentBoxType = '') {
    return {
        type: Types.CREATE_FEEDBACK,
        payload: {
            api: Configs.API_BOOKING + `/api/commentboxes/member?culture=en`,
            method: 'POST',
            token: accessTokenAPI,
            payload: {
                "commentBoxNature": "INDIVIDUAL",
                "commentBoxSourceId": commentBoxSourceId,
                "buildingId": buildingId,
                "userId": userId,
                "userName": userName,
                "unitId": unitId,
                "fullUnitCode": fullUnitCode,
                "commentBoxProjectType": "PROJECT",
                "commentBoxCategoryId": commentBoxCategoryId,
                "description": description,
                "commentBoxType": commentBoxType
            }
        }
    }
}

