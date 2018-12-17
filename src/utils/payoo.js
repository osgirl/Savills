import { NativeModules, Platform } from 'react-native';

export default class Payoo {

  static payooSdk = Platform.OS == 'ios' ? NativeModules.PayooSDKiOSManager : NativeModules.PayooSDKAndroidModule;

  static pay(sdkAuth, amount, email, phone, callback) {
    // sdkInfo.Lang = Lang.GetCurrentLang().Id;
    // sdkInfo.Email = AppData.getUserInfo().AccountInfo.Email;
    // sdkInfo.Phone = AppData.getUserInfo().AccountInfo.HandPhone;
    // sdkInfo.PayooOrderXML = orderXML;
    // sdkInfo.PayooOrderChecksum = checksum;

    let sdkInfo = {}
    sdkInfo.Lang = 1
    sdkInfo.Email = 'teo@gmail.com'
    sdkInfo.Phone = '0971742301'
    this.payooSdk.pay(JSON.parse(JSON.stringify(sdkInfo)))
      .then((response) => {
        if (callback) {
          if (Platform.OS == 'ios' && response && response.data) {
            var res = {
              code: response.data
            }
            response.data = JSON.stringify(res);
          }
          callback(response);
        }
      });
  }
}