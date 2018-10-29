import { combineReducers } from 'redux';

import app from './states/app/reducer';
import account from './states/account/reducer';
import units from './states/units/reducer';

export default combineReducers({
    app,
    account,
    units

});