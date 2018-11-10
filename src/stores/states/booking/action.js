import Types from './';
import Configs from '../../../utils/configs';
let accessTokenAPIs =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg5NDc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6ImxlZW5ndXllbiIsIkFzcE5ldC5JZGVudGl0eS5TZWN1cml0eVN0YW1wIjoiTVNKWVhGUkhER1hZNUtCNUxJU1JCUVFCTVBZTlMzSFciLCJHZW5kZXIiOiJNYWxlIiwiVW5pcXVlSWQiOiJhMmIyZmZkZC04ZTA4LTQ5NGEtYmY0OC04ODYwZDEyMDM4YjkiLCJJZENhcmQiOiIzMjEiLCJDb3VudHJ5Q29kZSI6IiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJodHRwOi8vd3d3LmFzcG5ldGJvaWxlcnBsYXRlLmNvbS9pZGVudGl0eS9jbGFpbXMvdGVuYW50SWQiOiI0Iiwic3ViIjoiODk0NzQiLCJqdGkiOiJiOTVkY2IxYS0zMmRhLTRhMGYtOWVkMi1kMjY3NzRhMGMxMzIiLCJpYXQiOjE1NDE1NTkwMjcsIlNlc3Npb25JZCI6IjU2IiwibmJmIjoxNTQxNTU5MDI3LCJleHAiOjE1NDQxNTEwMjcsImlzcyI6IlNQTVMtVmlldG5hbSIsImF1ZCI6IlNQTVMtVmlldG5hbSJ9.sVVXz9-o38JFtBJiZmYWPSjnIqMx0fcZIh8DJ6kEAJc';

// Tạo mới 1 booking
export function createNewBooking(accessTokenAPI) {
  return {
    type: Types.CREATE_NEW_BOOKING,
    payload: {
      api: Configs.API_BOOKING + '/api/bookings/create',
      method: 'POST',
      payload: {
        startDate: '2018-11-10T21:00:00+07:00',
        endDate: '2018-11-10T22:00:00+07:00',
        amenityId: 75,
        status: 'REQUESTED',
        amenity: {
          amenityId: 75,
          amenityName: 'BBQ T1-01'
        },
        buildingId: 4,
        unitId: 2,
        fullUnitId: 'T1-A03-02',
        userId: 89474,
        name: 'Leenguyen G Sep',
        phone: '0948044448',
        email: 'leenguyen1608@gmail.com',
        userName: 'leenguyen1608@gmail.com',
        profilePictureId: '263acfdf-d767-e984-a34b-39e9fb1b2ea4',
        paymentStatus: null,
        remark: 'Hi',
        isAcceptPolicy: true,
        tenantId: 4
      },
      token: accessTokenAPIs
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
      token: accessTokenAPIs
    }
  };
}

// lấy danh sách các category được chọn
export function getListCategory(accessTokenAPI) {
  return {
    type: Types.GET_LIST_CATEGORY,
    payload: {
      api: Configs.API_BOOKING + '/api/amenities?isActive=true&buildingId=4&culture=vi',
      method: 'GET',
      token: accessTokenAPIs
    }
  };
}

// lấy danh sách thời gian được booking trong ngày
export function getListBookingOption(accessTokenAPI) {
  return {
    type: Types.GET_LIST_BOOKING_OPTION,
    payload: {
      api: Configs.API_BOOKING + '/api/amenities/timeslots?amenityId=75&fromDate=2018/11/20&toDate=2018/11/20',
      method: 'GET',
      token: accessTokenAPIs
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
      token: accessTokenAPIs
    }
  };
}

// lấy danh sách 3 tab
export function getListBooking(accessTokenAPI, status) {
  return {
    type: Types.GET_LIST_BOOKING,
    payload: {
      api: Configs.API_BOOKING + '/api/bookings/mybookings?page=1&pageSize=10&isActive=true&groupStatus=' + status,
      method: 'GET',
      status: status,
      token: accessTokenAPIs
    }
  };
}

export function setFlagCreateBooking(bool = true) {
  return {
    type: Types.FLAG_CREATE_BOOKING,
    payload: bool
  };
}
