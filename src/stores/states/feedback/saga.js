import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getListFeedback(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_FEEDBACK_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getListCategory(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_CATEGORY_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}


function* getTypeFeedback(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_TYPE_FEEDBACK_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

export default function* saga() {
  yield takeLatest(Types.GET_LIST_FEEDBACK, getListFeedback);
  yield takeLatest(Types.GET_LIST_CATEGORY, getListCategory);
  yield takeLatest(Types.GET_LIST_TYPE_FEEDBACK, getTypeFeedback);
}