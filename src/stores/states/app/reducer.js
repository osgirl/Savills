import Types from './';
import createReducer from '../';

const INIT_STATE = {
  listLanguege: {},
  languegeLocal: '',
  notification: false
};

export default createReducer(INIT_STATE, {
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
