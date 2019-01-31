import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getListNotification(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getListCountModule(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_COUNT_MODULE_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* updateRead(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.UPDATE_READ_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getUnreadCount(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_UNREAD_COUNT_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* setAllNotificationsAsRead(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.SET_ALL_AS_READ_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* resetState() {
  try {
    yield put({ type: Types.RESET_STATE_SUCCESS });
  } catch (e) {
    console.log(e)
  }
}


export default function* saga() {
  yield takeLatest(Types.GET_LIST, getListNotification);
  yield takeLatest(Types.GET_COUNT_MODULE, getListCountModule);
  yield takeLatest(Types.UPDATE_READ, updateRead);
  yield takeLatest(Types.GET_UNREAD_COUNT, getUnreadCount);
  yield takeLatest(Types.SET_ALL_AS_READ, setAllNotificationsAsRead);

  yield takeLatest('ACCOUNT_LOGOUT', resetState);
}