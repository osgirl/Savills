import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* login(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.LOGIN_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getTenant(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_TENANT_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* switchToUserAccount(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_SWITCHTOUSERACCOUNT_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}


function* linkedAccountAuthenticate(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.LINKEDACCOUNTAUTHEN_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

export default function* saga() {
  yield takeLatest(Types.LOGIN, login);
  yield takeLatest(Types.GET_TENANT, getTenant);
  yield takeLatest(Types.GET_SWITCHTOUSERACCOUNT, switchToUserAccount);
  yield takeLatest(Types.LINKEDACCOUNTAUTHEN, linkedAccountAuthenticate);
}