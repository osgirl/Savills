import React, { Component } from 'react';
import Connect from '@stores';
import Layout from './layout';
import _ from "lodash";

class Profile extends Layout {

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        }
    }
}

export default Connect(Profile);

