import Types from './';
import createReducer from '../';

const INIT_STATE = {
  listFeedBack: { items: [], pageCount: 0, success: false },
  listCategory: {},
  typeFeedback: {},
  createFeedback: {},
  listComment: {},
  commentUnread: {},
  addComment: {},
  detailFeedback: {}
};

export default createReducer(INIT_STATE, {
  [Types.GET_LIST_FEEDBACK]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_FEEDBACK_SUCCESS]: (state, action) => {
    try {
      let tempState;
      tempState = Object.assign(
        {},
        { ...state },
        {
          listFeedBack: {
            items: action.response.result.items,
            success: action.response.success,
            pageCount: action.response.result.pageCount
          }
        }
      );
      return tempState;
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_FEEDBACK_FAIL]: (state, action) => {
    try {
      return {
        ...state,
        listFeedBack: {}
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_CATEGORY]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_CATEGORY_SUCCESS]: (state, action) => {
    try {
      let tempState;
      tempState = Object.assign(
        {},
        { ...state },
        {
          listCategory: action.response
        }
      );
      return tempState;
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_CATEGORY_FAIL]: (state, action) => {
    try {
      return {
        ...state,
        listCategory: {}
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_TYPE_FEEDBACK]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_TYPE_FEEDBACK_SUCCESS]: (state, action) => {
    try {
      let tempState;
      tempState = Object.assign(
        {},
        { ...state },
        {
          typeFeedback: action.response
        }
      );
      return tempState;
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_TYPE_FEEDBACK_FAIL]: (state, action) => {
    try {
      return {
        ...state,
        typeFeedback: {}
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.CREATE_FEEDBACK]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.CREATE_FEEDBACK_SUCCESS]: (state, action) => {
    try {
      let tempState;
      tempState = Object.assign(
        {},
        { ...state },
        {
          createFeedback: action.response
        }
      );
      return tempState;
    } catch (error) {
      console.log(error);
    }
  },

  [Types.CREATE_FEEDBACK_FAIL]: (state, action) => {
    try {
      return {
        ...state,
        createFeedback: {}
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

  [Types.GET_DETAIL]: (state, action) => {
    try {
      return {
        ...state
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_DETAIL_SUCCESS]: (state, action) => {
    try {
      let tempState;
      tempState = Object.assign(
        {},
        { ...state },
        {
          detailFeedback: action.response
        }
      );
      return tempState;
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_DETAIL_FAIL]: (state, action) => {
    try {
      return {
        ...state,
        detailFeedback: {}
      };
    } catch (error) {
      console.log(error);
    }
  },






});
