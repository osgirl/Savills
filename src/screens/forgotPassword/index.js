import React, { Component } from 'react';
import Connect from '@stores';
import Layout from './layout';
import _ from 'lodash';

import Header from '@components/header';
import IC_BACK from '@resources/icons/back-dark.png';

class ForgotPassword extends Layout {
  static navigationOptions = ({ navigation }) => ({
    header: (
      <Header
        headercolor={'transparent'}
        leftIcon={IC_BACK}
        leftAction={() => navigation.goBack()}
        // center={function () {
        //     return <View><Text>{this.app.test}</Text></View>
        // }}
        // rightIcon={IC_MENU}
        // rightAction={() => alert('Notify')}
      />
    )
  });

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      isShowModalVerify: false,
      email: '',
      flag: true
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (this.state.flag && nextProps.account.sendCodeVerify.success && !nextProps.account.isSendCodeVerify) {
      await this.setState({ loading: false, flag: false });
      this._gotoChangePassword();
    }

    if (this.state.flag && !_.isEmpty(nextProps.account.sendCodeVerify.error) && !nextProps.account.isSendCodeVerify) {
      console.log('222');
      await this.setState({ loading: false, flag: false });
      // alert(nextProps.account.sendCodeVerify.error.message)
    }
  }

  _sendPasswordResetCode(email) {
    if (this.state.loading) return;
    this.setState({ loading: true });
    if (!this.state.flag) {
      this.setState({ flag: true });
    }
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.account.sendPasswordResetCode(email, languages);
  }

  _gotoChangePassword() {
    this.props.navigation.navigate('ChangePassword', { status: 'forgot' });
  }
}

export default Connect(ForgotPassword);
