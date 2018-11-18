import Types from './';
import createReducer from '../';

const INIT_STATE = {
  workOrderDetail: false,
  listActive: false,
  listComplete: false,
  listComment: false,
  addComment: false,
  uploadImage: false,
  listArea: false,
  createWorkorder: false,
  updateWorkOrder: false,
  isCreateWorkOrder: true,
  isGetListWorkOrder: true,
  isUpdateWorkOrder: true
};

export default createReducer(INIT_STATE, {
  [Types.GET_LIST_AREA_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        listArea: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

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

  [Types.UPDATE_WORK_ORDER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        updateWorkOrder: action.response,
        isUpdateWorkOrder: false
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
      switch (action.payload.sort) {
        case 'ACTIVE': {
          return {
            ...state,
            listActive: action.response,
            isGetListWorkOrder: false
          };
        }
        case 'COMPLETED': {
          return {
            ...state,
            listComplete: action.response,
            isGetListWorkOrder: false
          };
        }
        default: {
          return { ...state };
        }
      }
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
  }),

  [Types.FLAG_GET_WORKORDER_LIST]: (state, action) => ({
    ...state,
    isGetListWorkOrder: true
  }),

  [Types.FLAG_UPDATE_WORKODER]: (state, action) => ({
    ...state,
    isUpdateWorkOrder: true
  })
});
