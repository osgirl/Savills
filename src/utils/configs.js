'use strict';
import { Platform } from 'react-native';

const configs = {
  VERSION: '1.0.0',
  API: `http://uat.spms.asia/core`,
  API_ACCOUNT: `http://uat-accounts.spms.asia/api`,
  API_COMMON: `http://uat.spms.asia/common`,
  API_BOOKING: `http://uat.spms.asia/booking`,
  API_UPLOAD_IMAGE: `http://uat-r.spms.asia/core`,

  // API: `https://savills.spms.asia/core`,
  // API_ACCOUNT: `https://accounts.spms.asia/api`,
  // API_COMMON: `https://savills.spms.asia/common`,
  // API_BOOKING: `https://savills.spms.asia/booking`,
  // API_UPLOAD_IMAGE: `https://savills.spms.asia/core`,

  Platform: Platform.OS,
  DEFAULT_WIDTH: 350,
  DEFAULT_HEIGHT: 680,
  colorMain: '#4A89E8',
  Shadow:
    Platform.OS === 'ios'
      ? {
        shadowColor: '#4A89E8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 15
      }
      : {},

  ShadowButton:
    Platform.OS === 'ios'
      ? {
        shadowColor: '#4A89E8',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.3,
        shadowRadius: 15
      }
      : {}
  // MAIL_TO: "cskh.coopmart.vn@gmail.com",
  // fontNormal: "Lato-Medium",
  // fontBold: "Lato-Bold",
};

export default configs;
