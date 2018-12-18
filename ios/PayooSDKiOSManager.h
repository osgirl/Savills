//
//  PaymentManager.h
//  helloworld
//
//  Created by Chi-Quyen Le on 10/17/17.
//  Copyright © 2017 Facebook. All rights reserved.
//

#import <React/RCTBridgeModule.h>
@import PayooSDK;
@interface PayooSDKiOSManager: NSObject<RCTBridgeModule>
@property (nonatomic) OrderRequest *order;

@end
