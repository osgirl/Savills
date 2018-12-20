import Types from './';
import createReducer from '../';

const INIT_STATE = {
  createNewBooking: false,
  listCategory: false,
  listBookingOption: false,
  detailBooking: false,
  changeStatusBooking: false,
  listComplete: { items: [], pageCount: 0, success: false },
  listOnGoing: { items: [], pageCount: 0, success: false },
  listActive: { items: [], pageCount: 0, success: false },
  detailCategory: false,
  message: '',

  isCreateBooking: true,
  isChangeStatus: true
};

export default createReducer(INIT_STATE, {
  [Types.CREATE_NEW_BOOKING_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        createNewBooking: action.response,
        message: action.response.error ? action.response.error.message : '',
        isCreateBooking: false
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.CREATE_NEW_BOOKING_FAIL]: (state, action) => {
    try {
      return {
        ...state,
        createNewBooking: action.response,
        isCreateBooking: false,
        message: action.response.error ? action.response.error.message : ''
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_DETAIL_CATEGORY_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        detailCategory: action.response
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_BOOKING_PROCESS_SUCCESS]: (state, action) => {
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

  [Types.GET_LIST_BOOKING_COMMING_SUCCESS]: (state, action) => {
    try {
      let tempState;
      tempState = Object.assign(
        {},
        { ...state },
        {
          listOnGoing: {
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

  [Types.GET_LIST_BOOKING_COMPLETE_SUCCESS]: (state, action) => {
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

  [Types.CHANGE_STATUS_BOOKING_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        changeStatusBooking: action.response,
        isChangeStatus: false
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_DETAIL_BOOKING_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        detailBooking: action.response
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

  [Types.GET_LIST_BOOKING_OPTION_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        listBookingOption: action.response,
        message: action.response.error ? action.response.error.message : ''
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.FLAG_CREATE_BOOKING]: (state, action) => ({
    ...state,
    isCreateBooking: true
  }),

  [Types.FLAG_CHANGE_STATUS]: (state, action) => ({
    ...state,
    isChangeStatus: true
  })
});
