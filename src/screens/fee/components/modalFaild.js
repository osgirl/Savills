import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { Button } from '@components';

import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';

import Connect from '@stores';

const { width } = Dimensions.get('window');

class modalFaildOrder extends Component {
  render() {
    const { isVisible, message } = this.props;
    return (
      <Modal style={styles.container} isVisible={isVisible}>
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
            <Button onPress={() => this.props.onClose()} style={{ padding: 20, position: 'absolute', top: 0, left: 0 }}>
              <Text>x</Text>
            </Button>
            <Image source={require('@resources/icons/warning.png')} />
            <Text style={{ marginVertical: 10, color: '#505E75', fontSize: 13, fontFamily: 'OpenSans-Bold' }}>Sorry !</Text>
            <Text style={{ marginBottom: 20, color: '#BABFC8', fontFamily: 'OpenSans-Regular', textAlign: 'center' }}>
              {message}
            </Text>
            <Button style={{ width: width - 80, marginHorizontal: 20, height: 50 }} onPress={() => this.props.onClose()}>
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>Close</Text>
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
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

export default Connect(modalFaildOrder);
