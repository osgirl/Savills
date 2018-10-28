'use strict';
import { Platform } from 'react-native';

const configs = {
    VERSION: "1.0.0",
    // API: '',
    Platform: Platform.OS,
    DEFAULT_WIDTH: 375,
    DEFAULT_HEIGHT: 666,
    colorMain: '#ED0677',
    Shadow: {
        borderColor: "#ccc",
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    Shadow_2: {
        borderColor: "#ccc",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 1,
    },
    // MAIL_TO: "cskh.coopmart.vn@gmail.com",
    // fontNormal: "Lato-Medium",
    // fontBold: "Lato-Bold",
};

export default configs;