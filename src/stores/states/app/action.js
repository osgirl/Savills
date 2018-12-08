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
            isSubscribed: dataSetting.emailOne
          },
          {
            name: 'Notification.FeeStatement',
            isSubscribed: dataSetting.one
          },
          {
            name: 'Email.WorkOrders',
            isSubscribed: dataSetting.emailTwo
          },
          {
            name: 'Notification.WorkOrders',
            isSubscribed: dataSetting.two
          },
          {
            name: 'Email.Bookings',
            isSubscribed: dataSetting.emailThree
          },
          {
            name: 'Notification.Bookings',
            isSubscribed: dataSetting.three
          },
          {
            name: 'Email.Events',
            isSubscribed: dataSetting.emailFour
          },
          {
            name: 'Notification.Events',
            isSubscribed: dataSetting.four
          },
          {
            name: 'Email.Feedbacks',
            isSubscribed: dataSetting.emailFive
          },
          {
            name: 'Notification.Feedbacks',
            isSubscribed: dataSetting.five
          },
          {
            name: 'Email.Communication',
            isSubscribed: dataSetting.emailSix
          },
          {
            name: 'Notification.Communication',
            isSubscribed: dataSetting.six
          },
          {
            name: 'Email.Delivery',
            isSubscribed: dataSetting.emailSevent
          },
          {
            name: 'Notification.Delivery',
            isSubscribed: dataSetting.sevent
          },
          {
            name: 'Email.Library',
            isSubscribed: true
          },
          {
            name: 'Notification.Library',
            isSubscribed: true
          }
        ]
      }
    }
  };
}
