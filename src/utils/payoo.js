import { NativeModules, Platform } from 'react-native';
import DeviceInfo from 'react-native-device-info';

export default class Payoo {
  static payooSdk = Platform.OS == 'ios' ? NativeModules.PayooSDKiOSManager : NativeModules.PayooSDKAndroidModule;
  static EnviProd =
    DeviceInfo.getBundleId() === 'com.savills.spms' || DeviceInfo.getBundleId() === 'com.savills.spms.hk' ? true : false;
  static async pay(language = 0, OrderXML, OrderChecksum, callback) {
    let sdkInfo = {};
    sdkInfo.Environment = this.EnviProd ? 1 : 0; // 0: DEV, 1: PROD
    sdkInfo.Language = language === 0 ? 1 : 0;

    //prod
    sdkInfo.MerchantID = this.EnviProd ? '1608' : '799';
    sdkInfo.MerchantShareKey = this.EnviProd ? 'cd5dc10571cf2f740a484815cf53eb9b' : '3b15455cf91c99a224ff32b43f0b5dc0';

    sdkInfo.PayooOrderChecksum = OrderChecksum;
    sdkInfo.PayooOrderXML = OrderXML;

    let response = await this.payooSdk.pay(JSON.parse(JSON.stringify(sdkInfo)));
    if (response) {
      if (callback) {
        if (Platform.OS == 'ios') {
          callback(response);
        }
        callback(response);
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
