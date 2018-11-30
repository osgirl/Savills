import Types from './';
import createReducer from '../';

const INIT_STATE = {
  listDelivery: false,
  detailDelivery: false,

  listIntrustion: false,
  detailIntroduction: false,
  createIntroduction: false,
  editIntroduction: false,

  isIntroduction: true,
  isDelivery: true
};

export default createReducer(INIT_STATE, {
  [Types.GET_LIST_DELIVERY_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        listDelivery: action.response,
        isDelivery: false
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_DETAIL_DELIVERY_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        detailDelivery: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_INTRUSTION_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        listIntrustion: action.response,
        isIntroduction: false
      };
    } catch (error) {
      console.log(error);
    }
  },
  [Types.GET_DETAIL_INTRUSTION_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        detailIntroduction: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.CREATE_INTRUSTION_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        createIntroduction: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.EDIT_INTRUSTION_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        editIntroduction: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  // FLAG
  [Types.FLAG_GET_INTRODUCTION]: (state, action) => ({
    ...state,
    isIntroduction: true
  }),

  [Types.FLAG_GET_DELIVERY]: (state, action) => ({
    ...state,
    isDelivery: true
  })
});
