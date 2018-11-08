import React, { Component } from 'react';
import Connect from '@stores';
import Layout from './layout';

class Contacts extends Layout {

    constructor(props) {
        super(props);
        this.state = {
            isModalSelectUnit: false
        }
    }
}

export default Connect(Contacts);

