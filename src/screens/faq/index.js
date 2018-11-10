import React, { Component } from 'react';
import Connect from '@stores';
import layout from './layout';

import _ from "lodash";

class FAQ extends layout {

    constructor(props) {
        super(props);
        this.state = {
            isModalSelectUnit: false
        }
    }

}

export default Connect(FAQ);
