import Connect from '@stores';
import layout from './layout';
import { StatusBar, Platform, PushNotificationIOS } from 'react-native';

import _ from 'lodash';

// import Amplify from 'aws-amplify';
// import { PushNotification } from 'aws-amplify-react-native';
// import aws_exports from '../../../aws-exports';

// const aws_exports = {
//   aws_app_analytics: 'enable',
//   aws_cognito_identity_pool_id: 'eu-west-1:3d504a14-eee3-4cfd-a94f-b9c0215c697b',
//   aws_cognito_region: 'eu-west-1',
//   aws_content_delivery: 'enable',
//   aws_content_delivery_bucket: 'savills-hosting-mobilehub-1328358886',
//   aws_content_delivery_bucket_region: 'eu-west-1',
//   aws_content_delivery_cloudfront: 'enable',
//   aws_content_delivery_cloudfront_domain: 'd3os0ratmicf2f.cloudfront.net',
//   aws_mobile_analytics_app_id: '6812eba94abc43dba0cbdeb9d2b899a7',
//   aws_mobile_analytics_app_region: 'us-east-1',
//   aws_project_id: '39899dff-b59e-43a7-95f2-44a57e62c939',
//   aws_project_name: 'Savills',
//   aws_project_region: 'eu-west-1',
//   aws_resource_name_prefix: 'savills-mobilehub-1328358886'
// };

// Amplify.configure(aws_exports);
// PushNotification.configure(aws_exports);

class Launcher extends layout {
  constructor(props) {
    super(props);
    StatusBar.setHidden(true);
  }

  // componentDidMount() {
  //   PushNotification.onNotification(notification => {
  //     console.log('in app notification', notification);
  //     // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
  //     notification.finish(PushNotificationIOS.FetchResult.NoData);
  //   });

  //   // gets the registration token
  //   PushNotification.onRegister(token => {
  //     console.log('in app registration', token);
  //   });
  // }
  componentDidMount() {
    console.log('vao day');
    PushNotificationIOS.addEventListener('register', token => {
      console.log('asdlsadaskdljasdklajsdlkasda', token);
    });
    PushNotificationIOS.requestPermissions();
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
