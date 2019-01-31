package com.savills.spms.hk;

import android.app.AlertDialog;
import android.content.DialogInterface;
import android.graphics.Color;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.support.v7.widget.AppCompatEditText;
import android.text.TextUtils;
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

import vn.payoo.paymentsdk.OnPayooPaymentCompleteListener;
import vn.payoo.paymentsdk.PaymentConfig;
import vn.payoo.paymentsdk.PayooMerchant;
import vn.payoo.paymentsdk.PayooPaymentSDK;
import vn.payoo.paymentsdk.data.model.Order;
import vn.payoo.paymentsdk.data.model.response.ResponseObject;
import vn.payoo.paymentsdk.data.model.type.GroupType;

import com.savills.spms.hk.MainApplication;


import android.content.Intent;
import android.app.Activity;

import org.json.JSONException;


public class PayooSDKAndroidModule extends ReactContextBaseJavaModule implements OnPayooPaymentCompleteListener, ActivityEventListener {

    private static final String KEY_AUTH_TOKEN = "app_auth_token";

    private static final String KEY_USER_ID = "user_id";

    private AppCompatEditText editAuthToken;
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

    private Promise promise;

    @ReactMethod
    public void pay(ReadableMap input, Promise promise) throws JSONException {
        this.promise = promise;
        Log.d("======================","Vao day");
        String orderXML = input.getString("PayooOrderXML");
        String merchantId = input.getString("MerchantID");
        String merchantShareKey = input.getString("MerchantShareKey");
        String checksum = input.getString("PayooOrderChecksum");
        int lang = input.getInt("Language");
        order = Order.newBuilder().checksum(checksum).orderInfo(orderXML).build();

        PayooMerchant payooMerchant = PayooMerchant.newBuilder().merchantId(merchantId).secretKey(merchantShareKey).isDevMode(false).build();
        PayooPaymentSDK.initialize(getReactApplicationContext(), payooMerchant);
        PaymentConfig configure = PaymentConfig.newBuilder().withLocale(com.savills.spms.hk.LocaleHelper.getLocale(getReactApplicationContext(), lang == 0 ? PayooPaymentSDK.LOCALE_VI : PayooPaymentSDK.LOCALE_EN))
                .withStyleResId(R.style.PayooSdkTheme_Blue)
                .build();
        PayooPaymentSDK.pay(getReactApplicationContext().getCurrentActivity(), order, configure);
    }


    @Override
    public void onPayooPaymentComplete(@GroupType int groupType, @NonNull ResponseObject responseObject) {
        if (groupType == GroupType.SUCCESS) {
            if (responseObject.getData() != null) {
                String authToken = responseObject.getData().getAuthToken();
                if (!TextUtils.isEmpty(authToken)) {
                    PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext()).edit().putString(KEY_AUTH_TOKEN, authToken).apply();
                    editAuthToken.setText(PreferenceManager.getDefaultSharedPreferences(getReactApplicationContext()).getString(KEY_AUTH_TOKEN, ""));
                }
            }
        }

        WritableMap result = new WritableNativeMap();
        result.putInt("status", groupType);
        result.putString("data", new Gson().toJson(responseObject));
        promise.resolve(result);
        Log.d("======================","onPayooPaymentComplete");
//        showMessage(groupType, responseObject);
    }

    @Override
    public void onActivityResult(Activity activity, int requestCode, int resultCode, Intent data) {

    }

    @Override
    public void onNewIntent(Intent intent) {

    }

    private void showMessage(@GroupType int groupType, ResponseObject responseObject) {
        new android.support.v7.app.AlertDialog.Builder(getReactApplicationContext())
                .setTitle(String.valueOf(groupType))
                .setMessage(responseObject.toString())
                .setPositiveButton(R.string.text_close, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .show();
    }
}