import Types from './';
import createReducer from '../';

const INIT_STATE = {
  workOrderList: {},
  workOrderDetail: false,
  listCategory: false,
  listComment: false,
  addComment: false,
  uploadImage: false,
  createWorkorder: false,

  isCreateWorkOrder: true
};

export default createReducer(INIT_STATE, {
  [Types.UPDATE_IMAGE_WORKORDER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        uploadImage: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_COMMENT_USER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        listComment: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.ADD_COMMENT_USER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        addComment: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_CATEGORY_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        listCategory: action.response
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

  [Types.CREATE_WORK_ORDER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        createWorkorder: action.response,
        isCreateWorkOrder: false
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
  },

  [Types.FLAG_CREATE_WORKORDER]: (state, action) => ({
    ...state,
    isCreateWorkOrder: true
  })
});
