import { NativeModules, Platform } from 'react-native';

export default class Payoo {

  static payooSdk = Platform.OS == 'ios' ? NativeModules.PayooSDKiOSManager : NativeModules.PayooSDKAndroidModule;

  static pay(OrderXML, OrderChecksum, callback) {

    let sdkInfo = {}
    sdkInfo.Language = 0;
    sdkInfo.MerchantID = '799';
    sdkInfo.MerchantShareKey = '3b15455cf91c99a224ff32b43f0b5dc0';
    sdkInfo.PayooOrderChecksum = OrderChecksum;
    sdkInfo.PayooOrderXML = OrderXML;

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