import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getListDelivery(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_DELIVERY_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getDetailDelivery(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_DETAIL_DELIVERY_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getListIntrustion(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_INTRUSTION_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getDetailIntrustion(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_DETAIL_INTRUSTION_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* createIntrustion(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.CREATE_INTRUSTION_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* editIntrustion(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.EDIT_INTRUSTION_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(Types.CREATE_INTRUSTION, createIntrustion);
  yield takeLatest(Types.EDIT_INTRUSTION, editIntrustion);
  yield takeLatest(Types.GET_DETAIL_INTRUSTION, getDetailIntrustion);
  yield takeLatest(Types.GET_DETAIL_DELIVERY, getDetailDelivery);
  yield takeLatest(Types.GET_LIST_INTRUSTION, getListIntrustion);
  yield takeLatest(Types.GET_LIST_DELIVERY, getListDelivery);
}
