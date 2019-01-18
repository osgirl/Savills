import { NativeModules, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';
export default class Payoo {
  static payooSdk = Platform.OS == 'ios' ? NativeModules.PayooSDKiOSManager : NativeModules.PayooSDKAndroidModule;

  static async pay(language = 0, OrderXML, OrderChecksum, callback) {
    let sdkInfo = {};
    sdkInfo.Environment = 1; // 0: DEV, 1: PROD
    sdkInfo.Language = language === 0 ? 1 : 0;

    // uat
    // sdkInfo.MerchantID = '799';
    // sdkInfo.MerchantShareKey = '3b15455cf91c99a224ff32b43f0b5dc0';

    //prod
    sdkInfo.MerchantID = '1608';
    sdkInfo.MerchantShareKey = 'cd5dc10571cf2f740a484815cf53eb9b';

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
      alert('ERROR PAYOO');
    }
  }

  static handleErrorMess(code, languageData = {}) {
    let mess = languageData.PAYOOCODE_ERROR_DEFAULT + code || 'ERROR + !!' + code;
    Object.entries(languageData).forEach(([key, value]) => {
      if (key === `PAYOOCODE_${code}`) {
        mess = value + code;
      }
    });
    return mess;
  }
}
