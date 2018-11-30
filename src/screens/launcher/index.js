import Connect from '@stores';
import layout from './layout';
import { StatusBar, Platform } from 'react-native';

import _ from 'lodash';

class Launcher extends layout {
  constructor(props) {
    super(props);
    StatusBar.setHidden(true);
  }

  async componentWillMount() {
    await this.props.actions.account.getAccessTokenLocal();
    await this.props.actions.account.getTenantLocal();
    await this.props.actions.account.getAccessApiTokenLocal();
    await this.props.actions.account.getEncTokenLocal();

    await this.props.actions.units.getUnitLocal();

    await this.props.actions.app.getLanguageLocal();
    if (this.props.app.languegeLocal.length <= 0) {
      await this.props.actions.app.setLanguageLocal('0');
    }

    if (
      this.props.account.accessToken.length > 0 &&
      this.props.account.accessTokenAPI.length > 0 &&
      this.props.account.encToken.length > 0 &&
      !_.isEmpty(this.props.account.tenantLocal) &&
      !_.isEmpty(this.props.units.unitActive)
    ) {
      this.props.navigation.navigate('Home');
    } else {
      this.props.navigation.navigate('Login');
    }
  }
}

export default Connect(Launcher);
