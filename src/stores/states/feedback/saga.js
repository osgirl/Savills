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

function* createFeedback(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.CREATE_FEEDBACK_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getCommentUser(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_COMMENT_USER_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getCommentUnread(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_COMMENT_UNREAD_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* addCommentUser(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.ADD_COMMENT_USER_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

export default function* saga() {
  yield takeLatest(Types.GET_LIST_FEEDBACK, getListFeedback);
  yield takeLatest(Types.GET_LIST_CATEGORY, getListCategory);
  yield takeLatest(Types.GET_LIST_TYPE_FEEDBACK, getTypeFeedback);
  yield takeLatest(Types.CREATE_FEEDBACK, createFeedback);
  yield takeLatest(Types.GET_COMMENT_USER, getCommentUser);
  yield takeLatest(Types.GET_COMMENT_UNREAD, getCommentUnread);
  yield takeLatest(Types.ADD_COMMENT_USER, addCommentUser);
}