import { combineReducers } from 'redux';

import app from './states/app/reducer';
import account from './states/account/reducer';

export default combineReducers({
    app,
    account,

});