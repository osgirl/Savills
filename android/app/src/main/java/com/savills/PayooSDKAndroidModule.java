package com.savills;

import android.graphics.Color;
import android.util.Log;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.ReadableMap;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.bridge.NativeModule;

import com.google.gson.Gson;

import vn.payoo.paymentsdk.PaymentConfig;
import vn.payoo.paymentsdk.PayooMerchant;
import vn.payoo.paymentsdk.PayooPaymentSDK;
import vn.payoo.paymentsdk.data.model.Order;
import vn.payoo.paymentsdk.data.model.response.ResponseObject;
import vn.payoo.paymentsdk.data.model.type.GroupType;

import com.savills.MainApplication;



import android.content.Intent;
import android.app.Activity;

import org.json.JSONException;

public class PayooSDKAndroidModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    ReactContext reactContext;

    public PayooSDKAndroidModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    public static Order order;

    @Override
    public String getName() {
        return "PayooSDKAndroidModule";
    }

    private  Promise promise;

    @ReactMethod
    public void pay(ReadableMap input, Promise promise) throws JSONException {
        this.promise = promise;

        Log.d("", input.toString());
        String orderXML = input.getString("PayooOrderXML");
        String merchantId = input.getString("MerchantID");
        String merchantShareKey = input.getString("MerchantShareKey");
        String checksum = input.getString("PayooOrderChecksum");
        String email = input.getString("Email");
        String phone = input.getString("Phone");
        int lang = input.getInt("Lang");
        order = Order.newBuilder().checksum(checksum).orderInfo(orderXML).build();

        PayooMerchant payooMerchant = PayooMerchant.newBuilder().merchantId(merchantId).secretKey(merchantShareKey).isDevMode(true).build();
        PayooPaymentSDK.initialize(getReactApplicationContext(),payooMerchant);
        PaymentConfig configure = PaymentConfig.newBuilder().withLocale(LocaleHelper.getLocale(getReactApplicationContext(), lang == 0 ? PayooPaymentSDK.LOCALE_VI : PayooPaymentSDK.LOCALE_EN))
                .withCustomerEmail(email)
                .withCustomerPhone(phone)
                .withThemeResId(R.style.PayooSdkTheme_Blue)
                .build();
        PayooPaymentSDK.pay(getCurrentActivity(),order,configure);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

        if (requestCode == PayooPaymentSDK.REQUEST_CODE_PAYOO_PAYMENT_SDK) {
            if (resultCode == Activity.RESULT_OK) {
                ResponseObject responseObject = (ResponseObject) data.getSerializableExtra(PayooPaymentSDK.EXTRA_RESPONSE_OBJECT);
                int code = responseObject.getCode();
                GroupType groupType = (GroupType) data.getSerializableExtra(PayooPaymentSDK.EXTRA_GROUP_TYPE);
                String message = responseObject.getMessage();
                Log.d("nhannguyen", String.format("code: %d | groupType: %d | message: %s", code, groupType.getValue(), message));
                switch (groupType) {
                    case SUCCESS:
                        try {

                            WritableMap result = new WritableNativeMap();

                            result.putInt("status", groupType.getValue());
                            result.putString("data", new Gson().toJson(responseObject));
                            promise.resolve(result);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        break;
                    case FAILURE:
                    case UNKNOWN:
                    default:
                        try {
                            WritableMap result = new WritableNativeMap();
                            result.putInt("status", groupType.getValue());
                            result.putString("data", new Gson().toJson(responseObject));
                            promise.resolve(result);
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        break;
                }
            }
        }

    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
