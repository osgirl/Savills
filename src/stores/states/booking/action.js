import Types from './';
import Configs from '../../../utils/configs';

// Tạo mới 1 booking
export function createNewBooking(accessTokenAPI, Booking) {
  return {
    type: Types.CREATE_NEW_BOOKING,
    payload: {
      api: Configs.API_BOOKING + '/api/bookings/create',
      method: 'POST',
      payload: {
        startDate: Booking.startDate,
        endDate: Booking.endDate,
        amenityId: Booking.amenityId,
        status: 'REQUESTED',
        amenity: {
          amenityId: Booking.amenityId,
          amenityName: Booking.amenityName
        },
        buildingId: Booking.buildingId,
        unitId: Booking.unitId,
        fullUnitId: Booking.fullUnitId,
        userId: Booking.userId,
        name: Booking.name,
        phone: Booking.phone,
        email: Booking.email,
        userName: Booking.userName,
        profilePictureId: Booking.profilePictureId,
        paymentStatus: null,
        remark: Booking.remark,
        isAcceptPolicy: true,
        tenantId: Booking.tenantId
      },
      token: accessTokenAPI
    }
  };
}

// chi tiết 1 booking
export function getDetailBooking(accessTokenAPI, id) {
  return {
    type: Types.GET_DETAIL_BOOKING,
    payload: {
      api: Configs.API_BOOKING + '/api/bookings/' + id,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

// lấy danh sách các category được chọn
export function getListCategory(accessTokenAPI, id) {
  return {
    type: Types.GET_LIST_CATEGORY,
    payload: {
      api: Configs.API_BOOKING + `/api/amenities?isActive=true&buildingId=${id}&culture=vi`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

// lấy danh sách thời gian được booking trong ngày
export function getListBookingOption(accessTokenApi, data) {
  return {
    type: Types.GET_LIST_BOOKING_OPTION,
    payload: {
      api:
        Configs.API_BOOKING +
        `/api/amenities/timeslots?amenityId=${data.emenityId}&fromDate=${data.fromDate}&toDate=${data.toDate}`,
      method: 'GET',
      token: accessTokenApi
    }
  };
}

// lấy danh sách thời gian được booking trong này
export function changeStatusBooking(accessTokenAPI, id) {
  return {
    type: Types.CHANGE_STATUS_BOOKING,
    payload: {
      api: Configs.API_BOOKING + '/api/bookings/resident',
      method: 'PUT',
      payload: { reservationId: id, status: 'CANCELED' },
      token: accessTokenAPI
    }
  };
}

// lấy danh sách 3 tab
export function getListBooking(accessTokenAPI, status, page = 1) {
  return {
    type: Types.GET_LIST_BOOKING,
    payload: {
      api: Configs.API_BOOKING + `/api/bookings/mybookings?page=${page}&pageSize=10&isActive=true&groupStatus=${status}`,
      method: 'GET',
      status: status,
      token: accessTokenAPI
    }
  };
}

// lấy chi tiết category
export function getDetailCategory(accessTokenAPI, id) {
  return {
    type: Types.GET_DETAIL_CATEGORY,
    payload: {
      api: Configs.API_BOOKING + `/api/amenities/${id}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function setFlagCreateBooking(bool = true) {
  return {
    type: Types.FLAG_CREATE_BOOKING,
    payload: bool
  };
}

export function setFlagChangeStatus(bool = true) {
  return {
    type: Types.FLAG_CHANGE_STATUS,
    payload: bool
  };
}
