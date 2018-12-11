import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getList(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_LIBARY_SUCCESS, response });
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


export default function* saga() {
  yield takeLatest(Types.GET_LIST_LIBARY, getList);
  yield takeLatest(Types.GET_DETAIL, getDetail);
}