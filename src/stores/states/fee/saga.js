import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getListUserFees(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_USER_FEE_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getListHistory(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_HISTORY_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getDetailHistory(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_DETAIL_HISTORY_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* createOrder(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.CREATE_ORDER_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

export default function* saga() {
  yield takeLatest(Types.GET_LIST_USER_FEE, getListUserFees);
  yield takeLatest(Types.GET_LIST_HISTORY, getListHistory);
  yield takeLatest(Types.GET_DETAIL_HISTORY, getDetailHistory);
  yield takeLatest(Types.CREATE_ORDER, createOrder);
}