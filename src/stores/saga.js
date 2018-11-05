import { all } from 'redux-saga/effects';
import app from './states/app/saga';
import account from './states/account/saga';
import units from './states/units/saga';
import userProfile from './states/userProfile/saga';
import workOrder from './states/workOrder/saga';
export default function* sagaRoot() {
  yield all([app(), account(), units(), userProfile(), workOrder()]);
}
