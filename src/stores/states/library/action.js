import Types from './';
import Configs from '../../../utils/configs';

export function getList(accessTokenAPI, culture = en) {
    return {
        type: Types.GET_LIST_LIBARY,
        payload: {
            api: Configs.API + `/api/services/app/Library/GetListLibraries?isBoc=true&isAdmin=false&culture=${culture}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}

export function getDetail(accessTokenAPI, libraryId = 0, culture = en) {
    return {
        type: Types.GET_DETAIL,
        payload: {
            api: Configs.API + `/api/services/app/Library/GetLibraryDocumentByLibraryId?libraryId=${libraryId}&culture=${culture}`,
            method: 'GET',
            token: accessTokenAPI,
        }
    }
}
