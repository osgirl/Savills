import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getUnits(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_UNITS_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getEmployeesByOu(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_EMP_BYOU_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

export default function* saga() {
  yield takeLatest(Types.GET_UNITS, getUnits);
  yield takeLatest(Types.GET_EMP_BYOU, getEmployeesByOu);
}