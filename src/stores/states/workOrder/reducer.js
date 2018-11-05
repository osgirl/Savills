import Types from './';
import createReducer from '../';

const INIT_STATE = {
  workOrderList: {},
  workOrderDetail: false
};

export default createReducer(INIT_STATE, {
  [Types.GET_LIST_WORKORDER]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_WORKORDER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        workOrderList: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.CREATE_WORK_ORDER]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.CREATE_WORK_ORDER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        createWorkorder: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.DETAIL_WORK_ORDER]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.DETAIL_WORK_ORDER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        workOrderDetail: action.response
      };
    } catch (error) {
      console.log(error);
    }
  }
});
