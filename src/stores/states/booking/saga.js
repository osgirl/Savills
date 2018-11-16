import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* createNewBooking(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.CREATE_NEW_BOOKING_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.CREATE_NEW_BOOKING_FAIL, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getDetailCategory(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_DETAIL_CATEGORY_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getListCategory(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_CATEGORY_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getDetailBooking(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_DETAIL_BOOKING_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getListBookingOption(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_BOOKING_OPTION_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* changeStatusBooking(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.CHANGE_STATUS_BOOKING_SUCCESS, response });
  } catch (e) {
    console.log('asdasdjasdhaskdhaskjdasda', e);
  }
}

function* getListBooking(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_BOOKING_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(Types.GET_DETAIL_CATEGORY, getDetailCategory);
  yield takeLatest(Types.GET_LIST_BOOKING, getListBooking);
  yield takeLatest(Types.CHANGE_STATUS_BOOKING, changeStatusBooking);
  yield takeLatest(Types.GET_DETAIL_BOOKING, getDetailBooking);
  yield takeLatest(Types.GET_LIST_BOOKING_OPTION, getListBookingOption);
  yield takeLatest(Types.CREATE_NEW_BOOKING, createNewBooking);
  yield takeLatest(Types.GET_LIST_CATEGORY, getListCategory);
}
