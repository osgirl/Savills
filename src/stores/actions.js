import * as app from './states/app/action';
import * as account from './states/account/action';
import * as units from './states/units/action';
import * as userProfile from './states/userProfile/action';
import * as events from './states/events/action';
import * as utilities from './states/utilities/action';
import * as workOrder from './states/workOrder/action';
import * as booking from './states/booking/action';
import * as notification from './states/notification/action';
import * as inbox from './states/inbox/action';
import * as frontDesk from './states/frontDesk/action';
import * as fee from './states/fee/action';

export default {
  frontDesk,
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
};
