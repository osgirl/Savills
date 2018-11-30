import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* setNotification(action) {
  let response = yield call(API.request, action.payload);
  yield put({ ...action, type: Types.REGISTER_NOTIFICATION_SUCCESS, response });
}

export default function* saga() {
  yield takeLatest(Types.REGISTER_NOTIFICATION, setNotification);
}
