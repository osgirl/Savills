import { all } from 'redux-saga/effects';
import app from './states/app/saga';
import account from './states/account/saga';
import units from './states/units/saga';
import userProfile from './states/userProfile/saga';
import workOrder from './states/workOrder/saga';
import events from './states/events/saga';
import utilities from './states/utilities/saga';
import booking from './states/booking/saga';
import notification from './states/notification/saga';
import inbox from './states/inbox/saga';
import fee from './states/fee/saga';
import frontDesk from './states/frontDesk/saga';
import feedback from './states/feedback/saga';

export default function* sagaRoot() {
  yield all([
    frontDesk(),
    app(),
    account(),
    units(),
    userProfile(),
    workOrder(),
    events(),
    utilities(),
    notification(),
    booking(),
    inbox(),
    fee(),
    feedback()
  ]);
}
