import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* setTest(action) {  
  let response = yield API.request(action.payload.url);
  yield put({ ...action, type: Types.TEST_SUCCESS, response });
}


export default function* saga() {
  // yield takeLatest(Types.TEST, setTest);
}