import { combineReducers } from 'redux';

import app from './states/app/reducer';
import account from './states/account/reducer';
import units from './states/units/reducer';
import userProfile from './states/userProfile/reducer';
import workOrder from './states/workOrder/reducer';
export default combineReducers({
  workOrder,
  app,
  account,
  units,
  userProfile
});
