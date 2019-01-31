package com.savills.spms;

import android.os.Bundle;
import android.os.PersistableBundle;
import android.preference.PreferenceManager;
import android.support.annotation.NonNull;
import android.support.annotation.Nullable;
import android.text.TextUtils;
import android.util.Log;

import com.facebook.react.ReactActivity;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeMap;
import com.google.gson.Gson;

import vn.payoo.paymentsdk.OnPayooPaymentCompleteListener;
import vn.payoo.paymentsdk.data.model.response.ResponseObject;
import vn.payoo.paymentsdk.data.model.type.GroupType;

public class MainActivity extends ReactActivity implements OnPayooPaymentCompleteListener {

    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    public static MainActivity instance;
    private Promise promise;

    @Override
    protected String getMainComponentName() {
        return "com.savills.spms";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        instance = this;
    }

    @Override
    public void onPayooPaymentComplete(@GroupType int groupType, @NonNull ResponseObject responseObject) {
        if (groupType == GroupType.SUCCESS) {
            if (responseObject.getData() != null) {
                WritableMap result = new WritableNativeMap();
                result.putInt("status", groupType);
                result.putString("data", new Gson().toJson(responseObject));
                promise.resolve(result);
            }
        } else {
            WritableMap result = new WritableNativeMap();
            result.putInt("status", groupType);
            result.putString("data", new Gson().toJson(responseObject));
            promise.resolve(result);
        }
    }

    public Promise getPromise() {
        return promise;
    }

    public void setPromise(Promise promise) {
        this.promise = promise;
    }

    public static MainActivity getInstance() {
        return instance;
    }
}
