import Types from './';
import createReducer from '../';

const INIT_STATE = {
  workOrderDetail: false,
  listActive: { items: [], pageCount: 0, success: false },
  listComplete: { items: [], pageCount: 0, success: false },
  listComment: false,
  addComment: false,
  uploadImage: false,
  commentUnread: false,
  listArea: false,
  createWorkorder: false,
  updateWorkOrder: false,
  isCreateWorkOrder: true,
  isGetListWorkOrder: true,
  isUpdateWorkOrder: true
};

export default createReducer(INIT_STATE, {
  [Types.GET_COMMENT_UNREAD_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        commentUnread: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.DELETE_IMAGE_WORKORDER_SUCCESS]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

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
  // get list
  [Types.GET_LIST_WORKORDER_ACTIVE_SUCCESS]: (state, action) => {
    try {
      let tempState;
      tempState = Object.assign(
        {},
        { ...state },
        {
          listActive: {
            items: action.response.result.items,
            success: action.response.success,
            totalCount: action.response.result.totalCount
          }
        }
      );
      return tempState;
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_WORKORDER_COMPLETE_SUCCESS]: (state, action) => {
    try {
      let tempState;
      tempState = Object.assign(
        {},
        { ...state },
        {
          listComplete: {
            items: action.response.result.items,
            success: action.response.success,
            totalCount: action.response.result.totalCount
          }
        }
      );
      return tempState;
    } catch (error) {
      console.log(error);
    }
  },

  // end get list

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
