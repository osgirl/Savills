'use strict';

import { Dimensions } from 'react-native';

import Config from './configs';
const { width, height } = Dimensions.get('window');

export default class {

    //dung de padding - marrgin
    static scale(size) {
        return width / Config.DEFAULT_WIDTH * size;
    }

    static scaleWidth(size, factor = 0.5) {
        // return size + (this.scale(size) - size) * factor;
        return width / Config.DEFAULT_WIDTH * size;
    }

    static scaleHeight(size) {
        return height / Config.DEFAULT_HEIGHT * size;
    }
}