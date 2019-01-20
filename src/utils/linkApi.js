'use strict';
import { Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const bundleId = DeviceInfo.getBundleId();

const configs = {
  API:
    bundleId === 'com.savills.spms'
      ? {
          VERSION: '2.0.0',
          API: `https://savills.spms.asia/core`,
          API_ACCOUNT: `https://accounts.spms.asia/api`,
          API_COMMON: `https://savills.spms.asia/common`,
          API_BOOKING: `https://savills.spms.asia/booking`,
          API_UPLOAD_IMAGE: `https://savills.spms.asia/core`
        }
      : bundleId === 'com.savills.spms.hk'
      ? {
          VERSION: '2.0.0',
          API: `https://savillshk.spms.asia/core`,
          API_ACCOUNT: `https://savillshk.spms.asia/api`,
          API_COMMON: `https://savillshk.spms.asia/common`,
          API_BOOKING: `https://savillshk.spms.asia/booking`,
          API_UPLOAD_IMAGE: `https://savillshk.spms.asia/core`
        }
      : {
          VERSION: '2.0.0',
          API: `https://uat.spms.asia/core`,
          API_ACCOUNT: `https://uat-accounts.spms.asia/api`,
          API_COMMON: `https://uat.spms.asia/common`,
          API_BOOKING: `https://uat.spms.asia/booking`,
          API_UPLOAD_IMAGE: `https://uat-r.spms.asia/core`
        }
};

export default configs.API;
