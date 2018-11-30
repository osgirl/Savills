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

export function logoutNotification(accessTokenAPI) {
  return {
    type: Types.LOGOUT_NOTIFICATION,
    payload: {
      api: Configs.API_ACCOUNT + '/api/TokenAuth/Logout',
      method: 'POST',
      token: accessTokenAPI,
      payload: {
        deviceTypeId: 0,
        deviceToken: 'string',
        deviceCode: 'string'
      }
    }
  };
}

export function getSetting(accessTokenAPI) {
  return {
    type: Types.LOGOUT_NOTIFICATION,
    payload: {
      api: Configs.API_ACCOUNT + '/core/api/services/app/Notification/GetNotificationSettings',
      method: 'GET',
      token: accessTokenAPI
    }
  };
}

export function updateSetting(accessTokenAPI) {
  return {
    type: Types.LOGOUT_NOTIFICATION,
    payload: {
      api: Configs.API_ACCOUNT + '/core/api/services/app/Notification/UpdateNotificationSettings',
      method: 'PUT',
      token: accessTokenAPI,
      payload: {
        receiveNotifications: true,
        notifications: [
          {
            name: 'Email.FeeStatement',
            isSubscribed: true
          },
          {
            name: 'Notification.FeeStatement',
            isSubscribed: true
          },
          {
            name: 'Email.WorkOrders',
            isSubscribed: true
          },
          {
            name: 'Notification.WorkOrders',
            isSubscribed: true
          },
          {
            name: 'Email.Bookings',
            isSubscribed: true
          },
          {
            name: 'Notification.Bookings',
            isSubscribed: true
          },
          {
            name: 'Email.Events',
            isSubscribed: true
          },
          {
            name: 'Notification.Events',
            isSubscribed: true
          },
          {
            name: 'Email.Library'
          },
          {
            name: 'Notification.Library',
            isSubscribed: true
          },
          {
            name: 'Email.Feedbacks',
            isSubscribed: true
          },
          {
            name: 'Notification.Feedbacks',
            isSubscribed: true
          },
          {
            name: 'Email.Communication',
            isSubscribed: true
          },
          {
            name: 'Notification.Communication',
            isSubscribed: true
          },
          {
            name: 'Email.Delivery',
            isSubscribed: true
          },
          {
            name: 'Notification.Delivery',
            isSubscribed: true
          }
        ]
      }
    }
  };
}
