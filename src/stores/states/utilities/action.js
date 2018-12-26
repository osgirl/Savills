import Types from './';
import Configs from '../../../utils/configs';

export function getFAQ(accessTokenAPI, lang) {
  return {
    type: Types.GET_FAQ,
    payload: {
      api: Configs.API + `/api/services/app/Utilities/GetFAQ?culture=${lang}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}
