import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ActivityIndicator } from 'react-native';
import Button from '@components/button';

import Connect from '@stores';
import LinearGradient from 'react-native-linear-gradient';

import Configs from '@utils/configs';

const { width } = Dimensions.get('window');

class modalSuccessOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      idReceip: ''
    };
  }

  componentDidMount = async () => {
    let accessTokenApi = this.props.account.accessTokenAPI || '';
    let orderId = this.props.fee.createOrder.result ? this.props.fee.createOrder.result.orderId : '';
    await this.props.actions.fee.getOrderId(accessTokenApi, orderId);
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.fee.orderDetail !== nextProps.fee.orderDetail && nextProps.fee.orderDetail.success) {
      this.setState({ loading: false });
      if (nextProps.fee.orderDetail.result.feeIncoming) {
        this.setState({ idReceip: nextProps.fee.orderDetail.result.feeIncoming.id || '' });
      } else {
        //TODO: check
      }
      return;
    }
    if (
      this.props.fee.orderDetail !== nextProps.fee.orderDetail &&
      !nextProps.fee.orderDetail.success &&
      nextProps.fee.orderDetail.error
    ) {
      if (nextProps.fee.orderDetail.error.message.length > 0) {
        alert(nextProps.fee.orderDetail.error.message);
      }
      this.setState({ loading: false });
      return;
    }
    if (this.props.fee.orderDetail === nextProps.fee.orderDetail && nextProps.fee.orderDetail.success) {
      this.setState({ loading: false });
      if (nextProps.fee.orderDetail.result.feeIncoming) {
        this.setState({ idReceip: nextProps.fee.orderDetail.result.feeIncoming.id || '' });
      } else {
        //TODO: check
      }
      return;
    }
  }

  render() {
    const { isVisible, message } = this.props;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={styles.wallper}>
        <View
          style={{
            width: width - 40,
            borderRadius: 10,
            backgroundColor: '#FFF',
            marginHorizontal: 20,
            alignItems: 'center',
            padding: 20
          }}
        >
          <Button onPress={() => this.props.onClose()} style={{ padding: 20, position: 'absolute', top: 0, left: 0, zIndex: 2 }}>
            <Image source={require('@resources/icons/close-black.png')} />
          </Button>
          {this.state.loading ? (
            <ActivityIndicator size={'large'} color={Configs.colorMain} />
          ) : (
            <View style={{ alignItems: 'center' }}>
              <Image source={require('@resources/icons/done.png')} />
              <Text style={{ marginVertical: 10, color: '#505E75', fontSize: 13, fontFamily: 'OpenSans-Bold' }}>
                {languages.FEE_MODAL_SUCCESS_DONE}
              </Text>
              <Text style={{ marginBottom: 20, color: '#BABFC8', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>
                {message}
              </Text>
              <Button
                style={{ width: width - 80, marginHorizontal: 20, height: 50 }}
                onPress={() => this.props.goDetail(this.state.idReceip)}
              >
                <LinearGradient
                  colors={['#4A89E8', '#8FBCFF']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
                >
                  <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>
                    {languages.FEE_MODAL_SUCCESS_BUTTON}
                  </Text>
                </LinearGradient>
              </Button>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 0
  },
  wallper: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Connect(modalSuccessOrder);
