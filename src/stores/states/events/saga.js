import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getMyEvents(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_MY_EVENTS_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getMyEventsOfDate(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_EVENTS_OF_DATE_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getOverviewMyEvents(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_OVERVIEW_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

export default function* saga() {
  yield takeLatest(Types.GET_MY_EVENTS, getMyEvents);
  yield takeLatest(Types.GET_EVENTS_OF_DATE, getMyEventsOfDate);
  yield takeLatest(Types.GET_OVERVIEW, getOverviewMyEvents);
}