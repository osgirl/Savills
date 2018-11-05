import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getWorkOrderList(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_WORKORDER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* detailWorkOrder(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.DETAIL_WORK_ORDER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* createlWorkOrder(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.CREATE_WORK_ORDER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(Types.CREATE_WORK_ORDER, createlWorkOrder);
  yield takeLatest(Types.GET_LIST_WORKORDER, getWorkOrderList);
  yield takeLatest(Types.DETAIL_WORK_ORDER, detailWorkOrder);
}
