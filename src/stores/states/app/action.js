import Types from './';
import Configs from '../../../utils/linkApi';

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

export function registerNotification(accessTokenAPI, deviceTypeId, deviceToken, deviceCode, lang) {
  return {
    type: Types.REGISTER_NOTIFICATION,
    payload: {
      api: Configs.API + `/api/services/app/DevicesAppServices/InsertOrUpdateDevices?culture=${lang}`,
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

export function getModuleHome(accessTokenAPI, lang) {
  return {
    type: Types.GET_MODULE_HOME,
    payload: {
      api: Configs.API + `/api/services/app/UserSetting/GetUserAuthConfig?culture=${lang}`,
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

export function changeLanguageServer(accessTokenAPI, lang) {
  return {
    type: Types.CHANGE_LANGUAGE_SERVER,
    payload: {
      api: Configs.API + `/api/services/app/Profile/ChangeLanguage?culture=${lang}`,
      method: 'POST',
      payload: { languageName: lang },
      token: accessTokenAPI
    }
  };
}

export function getSetting(accessTokenAPI, lang) {
  return {
    type: Types.GET_SETTING,
    payload: {
      api: Configs.API + `/api/services/app/Notification/GetNotificationSettings?culture=${lang}`,
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function updateSetting(accessTokenAPI, dataSetting, lang) {
  return {
    type: Types.UPDATE_SETTINGS,
    payload: {
      api: Configs.API + `/api/services/app/Notification/UpdateNotificationSettings?culture=${lang}`,
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
