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


export default function* saga() {
  yield takeLatest(Types.GET_LIST, getListNotification);
  yield takeLatest(Types.GET_COUNT_MODULE, getListCountModule);
  yield takeLatest(Types.UPDATE_READ, updateRead);
}