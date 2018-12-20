import React, { Component } from 'react';
import { Text, View, Image, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Button from '@components/button';
const { width, height } = Dimensions.get('window');
export class alertWarning extends Component {
  render() {
    const { isVisible, message } = this.props;
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} isVisible={isVisible}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', alignItems: 'center', justifyContent: 'center' }}>
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
            <Image source={require('@resources/icons/warning.png')} />
            <Text style={{ marginVertical: 10, color: '#505E75', fontSize: 13, fontFamily: 'OpenSans-Bold' }}>Sorry!</Text>
            <Text style={{ marginBottom: 20, color: '#BABFC8', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>
              {message}
            </Text>
            <Button style={{ width: width - 80, marginHorizontal: 20, height: 50 }} onPress={() => this.props.clickAction()}>
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>OK</Text>
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
    );
  }
}

export default alertWarning;
