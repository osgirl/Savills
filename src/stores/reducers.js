import { combineReducers } from 'redux';

import app from './states/app/reducer';
import account from './states/account/reducer';
import units from './states/units/reducer';
import userProfile from './states/userProfile/reducer';
import events from './states/events/reducer';
import utilities from './states/utilities/reducer';

export default combineReducers({
    app,
    account,
    units,
    userProfile,
    events,
    utilities

});