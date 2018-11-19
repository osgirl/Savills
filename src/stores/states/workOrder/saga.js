import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getWorkOrderList(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_WORKORDER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getListArea(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_AREA_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* detailWorkOrder(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.DETAIL_WORK_ORDER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* updateWorkOrder(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.UPDATE_WORK_ORDER_SUCCESS, response });
  } catch (e) {
    // console.log(e);
  }
}

function* createlWorkOrder(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.CREATE_WORK_ORDER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getListCategory(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_LIST_CATEGORY_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getListComment(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_COMMENT_USER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* addComment(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.ADD_COMMENT_USER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* uploadImage(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.UPDATE_IMAGE_WORKORDER_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

function* getCommentUnread(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_COMMENT_UNREAD_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(Types.GET_COMMENT_UNREAD, getCommentUnread);
  yield takeLatest(Types.GET_LIST_AREA, getListArea);
  yield takeLatest(Types.UPDATE_WORK_ORDER, updateWorkOrder);
  yield takeLatest(Types.UPDATE_IMAGE_WORKORDER, uploadImage);
  yield takeLatest(Types.ADD_COMMENT_USER, addComment);
  yield takeLatest(Types.GET_COMMENT_USER, getListComment);
  yield takeLatest(Types.GET_LIST_CATEGORY, getListCategory);
  yield takeLatest(Types.CREATE_WORK_ORDER, createlWorkOrder);
  yield takeLatest(Types.GET_LIST_WORKORDER, getWorkOrderList);
  yield takeLatest(Types.DETAIL_WORK_ORDER, detailWorkOrder);
}
