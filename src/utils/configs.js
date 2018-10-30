'use strict';
import { Platform } from 'react-native';

const configs = {
    VERSION: "1.0.0",
    API: 'https://uat.spms.asia/core/api',
    API_ACCOUNT: 'https://uat-accounts.spms.asia/api',
    Platform: Platform.OS,
    DEFAULT_WIDTH: 375,
    DEFAULT_HEIGHT: 666,
    colorMain: '#4A89E8',
    Shadow:
        Platform.OS === 'ios' ?
            {
                shadowColor: '#4A89E8',
                shadowOffset: { width: 0, height: 10, },
                shadowOpacity: 0.15,
                shadowRadius: 15,
            } : {

            },

    ShadowButton:
        Platform.OS === 'ios' ?
            {
                shadowColor: '#4A89E8',
                shadowOffset: { width: 0, height: 10, },
                shadowOpacity: 0.3,
                shadowRadius: 15,
            } : {

            }
    // MAIL_TO: "cskh.coopmart.vn@gmail.com",
    // fontNormal: "Lato-Medium",
    // fontBold: "Lato-Bold",
};

export default configs;