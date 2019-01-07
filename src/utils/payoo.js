import { NativeModules, Platform } from 'react-native';

export default class Payoo {

  static payooSdk = Platform.OS == 'ios' ? NativeModules.PayooSDKiOSManager : NativeModules.PayooSDKAndroidModule;

  static async pay(language = 0, OrderXML, OrderChecksum, callback) {

    let sdkInfo = {}
    sdkInfo.Environment = 0 // 0: DEV, 1: PROD
    sdkInfo.Language = language === 0 ? 1 : 0;
    sdkInfo.MerchantID = '799';
    sdkInfo.MerchantShareKey = '3b15455cf91c99a224ff32b43f0b5dc0';
    // sdkInfo.MerchantID = '813';
    // sdkInfo.MerchantShareKey = '5754f8a5f373aa955ccf3a8f69f75b25';
    sdkInfo.PayooOrderChecksum = OrderChecksum;
    sdkInfo.PayooOrderXML = OrderXML;

    let response = await this.payooSdk.pay(JSON.parse(JSON.stringify(sdkInfo)));
    if (response) {
      if (callback) {
        if (Platform.OS == 'ios') {
          callback(response);
        }
      }
    } else {
      alert('ERROR PAYOO')
    }
  }

  static handleErrorMess(code, languageData = {}) {
    let mess = 'Thanh toán không thành công'
    Object.entries(languageData).forEach(
      ([key, value]) => {
        if (key === `PAYOOCODE_${code}`) {
          mess = value;
        }
      }
    );
    return mess;
  }


}