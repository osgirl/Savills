import Types from './';
import Configs from '../../../utils/configs';

export function getLanguage(accessTokenAPI) {
  return {
    type: Types.GET_LANGUAGE,
    payload: {
      // api: Configs.API_BOOKING + `/api/events/myevents?buildingId=${buildingId}&fromDate=${fromDate}&toDate=${toDate}`,
      // method: 'GET',
      // token: accessTokenAPI,
    }
  };
}

export function setLanguageLocal(data) {
  return {
    type: Types.SET_LANGUAGE_LOCAL,
    payload: {
      storage: {
        key: 'LANGUAGE_LOCAL',
        type: 'setString',
        data: data
      }
    }
  };
}

export function getLanguageLocal() {
  return {
    type: Types.GET_LANGUAGE_LOCAL,
    payload: {
      storage: {
        key: 'LANGUAGE_LOCAL',
        type: 'getString'
      }
    }
  };
}

export function registerNotification(accessTokenAPI, deviceTypeId, deviceToken, deviceCode) {
  return {
    type: Types.REGISTER_NOTIFICATION,
    payload: {
      api: Configs.API + '/api/services/app/DevicesAppServices/InsertOrUpdateDevices',
      method: 'POST',
      token: accessTokenAPI,
      payload: {
        deviceTypeId,
        deviceToken,
        deviceCode
      }
    }
  };
}

export function getModuleHome(accessTokenAPI) {
  return {
    type: Types.GET_MODULE_HOME,
    payload: {
      api: Configs.API + '/api/services/app/UserSetting/GetUserAuthConfig',
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function logoutNoti(accessTokenAPI) {
  return {
    type: Types.LOGOUT_NOTI,
    payload: {
      api: Configs.API + '/api/TokenAuth/Logout',
      method: 'POST',
      token: accessTokenAPI,
      payload: {}
    }
  };
}

export function getLanguageApp() {
  return {
    type: Types.GET_LANGUAGE_APP,
    payload: {
      api: Configs.API + '/api/services/app/Language/GetClientSourceLanguageTexts?sourceName=MobileSource&sorting=key%20asc',
      method: 'GET'
    }
  };
}

export function getSetting(accessTokenAPI) {
  return {
    type: Types.GET_SETTING,
    payload: {
      api: Configs.API + '/api/services/app/Notification/GetNotificationSettings',
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function updateSetting(accessTokenAPI, dataSetting) {
  return {
    type: Types.UPDATE_SETTINGS,
    payload: {
      api: Configs.API + '/api/services/app/Notification/UpdateNotificationSettings',
      method: 'PUT',
      token: accessTokenAPI,
      payload: {
        receiveNotifications: true,
        notifications: [
          {
            name: 'Email.FeeStatement',
            isSubscribed: dataSetting.emailFee
          },
          {
            name: 'Notification.FeeStatement',
            isSubscribed: dataSetting.fee
          },
          {
            name: 'Email.WorkOrders',
            isSubscribed: dataSetting.emailWorkOrder
          },
          {
            name: 'Notification.WorkOrders',
            isSubscribed: dataSetting.workOrder
          },
          {
            name: 'Email.Bookings',
            isSubscribed: dataSetting.emailBooking
          },
          {
            name: 'Notification.Bookings',
            isSubscribed: dataSetting.booking
          },
          {
            name: 'Email.Events',
            isSubscribed: dataSetting.emailEvent
          },
          {
            name: 'Notification.Events',
            isSubscribed: dataSetting.event
          },
          {
            name: 'Email.Feedbacks',
            isSubscribed: dataSetting.emailFeedback
          },
          {
            name: 'Notification.Feedbacks',
            isSubscribed: dataSetting.feedback
          },
          {
            name: 'Email.Communication',
            isSubscribed: dataSetting.emailCommunication
          },
          {
            name: 'Notification.Communication',
            isSubscribed: dataSetting.communication
          },
          {
            name: 'Email.Delivery',
            isSubscribed: dataSetting.emailDelivery
          },
          {
            name: 'Notification.Delivery',
            isSubscribed: dataSetting.delivery
          },
          {
            name: 'Email.Inboxes',
            isSubscribed: dataSetting.emailInbox
          },
          {
            name: 'Notification.Inboxes',
            isSubscribed: dataSetting.inbox
          }
        ]
      }
    }
  };
}
