import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getListInbox(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_INBOX_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getListInboxIsActive(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_INBOX_ISACTIVE_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* setInboxActive(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.SET_INBOX_ACTIVE_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getDetail(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_DETAIL_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* setRead(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.SET_READ_INBOX_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}


export default function* saga() {
  yield takeLatest(Types.GET_LIST_INBOX, getListInbox);
  yield takeLatest(Types.GET_LIST_INBOX_ISACTIVE, getListInboxIsActive);
  yield takeLatest(Types.SET_INBOX_ACTIVE, setInboxActive);
  yield takeLatest(Types.GET_DETAIL, getDetail);
  yield takeLatest(Types.SET_READ_INBOX, setRead);
}