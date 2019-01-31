import { delay } from 'redux-saga';
import { call, put, take, takeEvery, takeLatest } from 'redux-saga/effects';

import Types from './';
import API from '../../../utils/api';

function* updateSetting(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.UPDATE_SETTINGS_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getSetting(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.GET_SETTING_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getModuleHome(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.GET_MODULE_HOME_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getLanguageApp(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.GET_LANGUAGE_APP_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* setNotification(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.REGISTER_NOTIFICATION_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* logoutNoti(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.LOGOUT_NOTI_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* changeLanguageServer(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.CHANGE_LANGUAGE_SERVER_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getLanguageProject(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.GET_LANGUAGE_PROJECT_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* getAnoument(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.GET_ANNOUNCEMENT_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

function* IgnoreMe(action) {
  try {
    let response = yield call(API.request, action.payload);
    if (response.success) {
      yield put({ ...action, type: Types.IGNORE_ME_SUCCESS, response });
    } else {
      yield put({ ...action, type: Types.APP_ERROR, response });
    }
  } catch (e) {
    console.log(e);
  }
}

export default function* saga() {
  yield takeLatest(Types.IGNORE_ME, IgnoreMe);
  yield takeLatest(Types.GET_ANNOUNCEMENT, getAnoument);
  yield takeLatest(Types.GET_LANGUAGE_PROJECT, getLanguageProject);
  yield takeLatest(Types.CHANGE_LANGUAGE_SERVER, changeLanguageServer);
  yield takeLatest(Types.LOGOUT_NOTI, logoutNoti);
  yield takeLatest(Types.GET_LANGUAGE_APP, getLanguageApp);
  yield takeLatest(Types.GET_SETTING, getSetting);
  yield takeLatest(Types.UPDATE_SETTINGS, updateSetting);
  yield takeLatest(Types.REGISTER_NOTIFICATION, setNotification);
  yield takeLatest(Types.GET_MODULE_HOME, getModuleHome);
}
