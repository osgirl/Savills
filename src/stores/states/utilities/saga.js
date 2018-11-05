import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getFAQ(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_FAQ_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}
export default function* saga() {
  yield takeLatest(Types.GET_FAQ, getFAQ);
}