import Types from './';
import createReducer from '../';

const INIT_STATE = {
  listLanguege: {},
  languegeLocal: 0,
  notification: false,
  setting: false,
  getSetting: false,
  moduleHome: false,
  listLanguage: false,
  announCements: [],
  ignoreMe: false
};

export default createReducer(INIT_STATE, {
  [Types.IGNORE_ME_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        ignoreMe: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_ANNOUNCEMENT_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        announCements: action.response.result
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.CHANGE_LANGUAGE_SERVER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.LOGOUT_NOTI_SUCCESS]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LANGUAGE_PROJECT_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        listLanguage: action.response.result
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LANGUAGE_APP_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        listLanguage: action.response.result
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_MODULE_HOME_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        moduleHome: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_SETTING_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        getSetting: action.response.result.notifications
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.UPDATE_SETTINGS_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        setting: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.REGISTER_NOTIFICATION_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        notification: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.SET_LANGUAGE_LOCAL_SUCCESS]: (state, action) => {
    let tempState = Object.assign({}, { ...state }, { languegeLocal: action.payload });
    return tempState;
  },

  [Types.GET_LANGUAGE_LOCAL_SUCCESS]: (state, action) => {
    let tempState = Object.assign({}, { ...state }, { languegeLocal: action.payload });
    return tempState;
  }
});
