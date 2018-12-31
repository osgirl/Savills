import React, { Component } from 'react';
import Connect from '@stores';
import Layout from './layout';

import { Header } from '@components';
import IC_BACK from '@resources/icons/back-dark.png';

class ChangePassword extends Layout {
  static navigationOptions = ({ navigation }) => ({
    header: <Header headercolor={'transparent'} leftIcon={IC_BACK} leftAction={() => navigation.goBack()} />
  });
}

export default Connect(ChangePassword);
