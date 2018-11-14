import { combineReducers } from 'redux';

import app from './states/app/reducer';
import account from './states/account/reducer';
import units from './states/units/reducer';
import userProfile from './states/userProfile/reducer';
import events from './states/events/reducer';
import utilities from './states/utilities/reducer';
import workOrder from './states/workOrder/reducer';
import booking from './states/booking/reducer';
import notification from './states/notification/reducer';
import inbox from './states/inbox/reducer';
import fee from './states/fee/reducer';

export default combineReducers({
  booking,
  workOrder,
  app,
  account,
  units,
  userProfile,
  events,
  utilities,
  notification,
  inbox,
  fee

});
