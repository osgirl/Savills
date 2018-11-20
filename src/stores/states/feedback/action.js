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

