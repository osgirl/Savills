'use strict';

import {
    Dimensions
} from 'react-native';
import Config from './configs';

const { width, height } = Dimensions.get('window');

export default class {
    static scaleWidth(size) {
        return width * size / Config.DEFAULT_WIDTH;
    }

    static scaleHeight(size) {
        return height * size / Config.DEFAULT_HEIGHT;
    }
}
