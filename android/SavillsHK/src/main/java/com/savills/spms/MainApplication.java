package com.savills.spms;

import android.app.Application;

import com.BV.LinearGradient.LinearGradientPackage;
import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.entria.views.RNViewOverflowPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;

import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.imagepicker.ImagePickerPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.microsoft.codepush.react.CodePush;
import com.reactlibrary.RNReactNativeDocViewerPackage;
import com.reactnative.ivpusic.imagepicker.PickerPackage;
import com.rnfs.RNFSPackage;
import com.savills.spms.PayooSDKPackage;
import com.zyu.ReactNativeWheelPickerPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected String getJSBundleFile() {
      return CodePush.getJSBundleFile();
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new PickerPackage(),
            new RNDeviceInfo(),
//            new RNFirebasePackage(),
            new ReactNativePushNotificationPackage(),
            new FastImageViewPackage(),
            new ImagePickerPackage(),
            new LinearGradientPackage(),
            new ReactNativeWheelPickerPackage(),
            new RNViewOverflowPackage(),
            new PayooSDKPackage(),
      new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey), getApplicationContext(), BuildConfig.DEBUG),
              new RNReactNativeDocViewerPackage(),
              new RNFSPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
