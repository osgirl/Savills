import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* updateSetting(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.UPDATE_SETTINGS_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getSetting(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_SETTING_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getModuleHome(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_MODULE_HOME_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* setNotification(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.REGISTER_NOTIFICATION_SUCCESS, response });
}

export default function* saga() {
  yield takeLatest(Types.GET_SETTING, getSetting);
  yield takeLatest(Types.UPDATE_SETTINGS, updateSetting);
  yield takeLatest(Types.REGISTER_NOTIFICATION, setNotification);
  yield takeLatest(Types.GET_MODULE_HOME, getModuleHome);
}
