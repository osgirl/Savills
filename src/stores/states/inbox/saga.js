import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* addInbox(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.ADD_INBOX_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getInboxFromManagement(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_INBOX_FROM_MANAGER_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getInboxToManagement(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_INBOX_TO_MANAGER_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getListInbox(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_INBOX_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* getListInboxIsActive(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_INBOX_ISACTIVE_SUCCESS, response });
  } catch (e) {
    console.log(e)
  }
}

function* setInboxActive(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.SET_INBOX_ACTIVE_SUCCESS, response });
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

function* setRead(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.SET_READ_INBOX_SUCCESS, response });
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
  yield takeLatest(Types.GET_LIST_INBOX, getListInbox);
  yield takeLatest(Types.GET_LIST_INBOX_ISACTIVE, getListInboxIsActive);
  yield takeLatest(Types.SET_INBOX_ACTIVE, setInboxActive);
  yield takeLatest(Types.GET_DETAIL, getDetail);
  yield takeLatest(Types.SET_READ_INBOX, setRead);
  yield takeLatest(Types.GET_LIST_INBOX_FROM_MANAGER, getInboxFromManagement);
  yield takeLatest(Types.GET_LIST_INBOX_TO_MANAGER, getInboxToManagement);
  yield takeLatest(Types.ADD_INBOX, addInbox);

  yield takeLatest(Types.GET_COMMENT_USER, getCommentUser);
  yield takeLatest(Types.GET_COMMENT_UNREAD, getCommentUnread);
  yield takeLatest(Types.ADD_COMMENT_USER, addCommentUser);
}