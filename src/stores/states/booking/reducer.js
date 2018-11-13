import Types from './';
import createReducer from '../';

const INIT_STATE = {
  createNewBooking: false,
  listCategory: false,
  listBookingOption: false,
  detailBooking: false,
  changeStatusBooking: false,
  listComplete: false,
  listOnGoing: false,
  listActive: false,

  isCreateBooking: true,
  isChangeStatus: true
};

export default createReducer(INIT_STATE, {
  [Types.CREATE_NEW_BOOKING_SUCCESS]: (state, action) => {
    try {
      return {
        ...state,
        createNewBooking: action.response,
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
        createNewBooking: false,
        isCreateBooking: false
      };
    } catch (error) {
      console.log(error);
    }
  },

  [Types.GET_LIST_BOOKING_SUCCESS]: (state, action) => {
    try {
      switch (action.payload.status) {
        case 'HISTORY': {
          return {
            ...state,
            listComplete: action.response
          };
        }
        case 'ONGOING': {
          return {
            ...state,
            listOnGoing: action.response
          };
        }
        case 'ACTIVE': {
          return {
            ...state,
            listActive: action.response
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
        listBookingOption: action.response
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
