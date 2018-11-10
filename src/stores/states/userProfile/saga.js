import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* getCurrentLoginInformations(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_USER_INFORMATION_SUCCESS, response });
  } catch (e) {
    // console.log(e)
  }
}

function* getImageUserProfile(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.GET_IMAGE_USER_SUCCESS, response });
  } catch (e) {
    // console.log(e)
  }
}

function* updateCurrentUserProfile(action) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.UPDATE_USER_PROFILE_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

let form_data = { 'Content-Type': 'multipart/form-data' };

function* changeAvatarProfile(action, form_data) {
  try {
    let response = yield call(API.request, action.payload);
    yield put({ ...action, type: Types.UPLOAD_AVATAR_SUCCESS, response });
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(Types.GET_USER_INFORMATION, getCurrentLoginInformations);
  yield takeLatest(Types.GET_IMAGE_USER, getImageUserProfile);
  yield takeLatest(Types.UPDATE_USER_PROFILE, updateCurrentUserProfile);
  yield takeLatest(Types.UPLOAD_AVATAR, changeAvatarProfile);
}
