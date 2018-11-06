import React, { Component } from 'react';
import Connect from '@stores';
import {
  View,
  Text,
  SafeAreaView,
  Dimensions,
  FlatList,
  Platform,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '@components/headerTitle';
import moment from 'moment';
import Header from '@components/header';
import IC_BACK from '@resources/icons/back-light.png';

import IC_MENU from '@resources/icons/icon_tabbar_active.png';
const { width } = Dimensions.get('window');
class TabWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listWorkOrder: []
    };
  }

  componentWillMount = () => {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.workOrder.getWorkOrderList(accessTokenApi);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.workOrder && nextProps.workOrder.workOrderList && nextProps.workOrder.workOrderList.success) {
      this.setState({ listWorkOrder: nextProps.workOrder.workOrderList.result.items });
    }
  };

  render() {
    let list = [];
    let listTwo = [];
    if (this.state.listWorkOrder.length > 0) {
      list = this.state.listWorkOrder.filter(e => e.currentStatus.codeName === 'New');
      listTwo = this.state.listWorkOrder.filter(e => e.currentStatus.codeName !== 'New');
    }
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          // center={
          //   <View style={{ justifyContent: 'center', alignItems: 'center', marginLeft: 100 }}>
          //     <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-SemiBold' }}>{this.props.navigation.getParam('eventTitle')}</Text>
          //   </View>
          // }
          text="T1-A03-02"
          display={'text'}
          rightAction={() => this._onpenModalSelectUnit()}
        />
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}>
          <HeaderTitle title="Yêu Cầu" />
          <ScrollableTabView
            tabBarActiveTextColor={'#FFF'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.5)'}
            tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
            tabBarBackgroundColor={'transparent'}
          >
            {this.ViewTwo(list)}
            {this.ViewThree(listTwo)}
          </ScrollableTabView>
        </LinearGradient>
        <View style={{ backgroundColor: '#FFF', width: width, height: 45 }} />
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('ModalWorkOrder', { profile: 'asd' })}
          style={{
            borderRadius: 25,
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: 20,
            left: width / 2 - 25,
            backgroundColor: '#01C772',
            shadowColor: '#4DD49A',
            shadowOffset: { width: 3, height: 6 },
            shadowOpacity: 0.3,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image source={require('../../resources/icons/close.png')} />
        </TouchableOpacity>
      </View>
    );
  }

  clickDetail = item => {
    this.props.navigation.navigate('ModalEditOrder', { id: item.id });
  };

  ViewTwo = list => {
    return (
      <View tabLabel="Đang xử lý" style={{ flex: 1, backgroundColor: '#F6F8FD', paddingTop: 20, paddingHorizontal: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          data={list}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          ListEmptyComponent={() => {
            return (
              <View style={{ marginTop: 50 }}>
                <Text>Load Data !!</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  ViewThree = list => {
    return (
      <View tabLabel="Hoàn tất" style={{ flex: 1, backgroundColor: '#F6F8FD', paddingTop: 20, paddingHorizontal: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          data={list}
          renderItem={({ item, index }) => this.renderItem(item, index)}
          ListEmptyComponent={() => {
            return (
              <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 100 }}>
                <Text style={{ color: '#515E6D', fontWeight: '500', fontSize: 18 }}>No data !!</Text>
              </View>
            );
          }}
        />
      </View>
    );
  };

  renderItem = (item, index) => {
    let date = moment(item.dateCreate).format('l');
    let time = moment(item.dateCreate).format('LT');
    return (
      <TouchableOpacity
        onPress={() => this.clickDetail(item)}
        key={item.id}
        style={{
          width: width - 40,
          height: 170,
          borderRadius: 10,
          marginVertical: 10,
          backgroundColor: '#FFF',
          padding: 20
        }}
      >
        <View style={{ flex: 1.5, flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <View style={{ borderRadius: 5, backgroundColor: '#505E75', width: 70 }}>
              <Text style={{ color: '#FFF', fontSize: 12, fontWeight: 'bold', marginVertical: 5, marginHorizontal: 15 }}>
                #{item.id}
              </Text>
            </View>
            <Text style={{ color: '#505E75', fontWeight: 'bold', fontSize: 13, marginTop: 12 }}>{item.fullUnitCode}</Text>
          </View>
          <Image
            style={{ width: 40, height: 40, borderRadius: 5 }}
            source={{ uri: 'http://imgt.taimienphi.vn/cf/Images/tt/2018/4/24/hinh-anh-che-13.jpg' }}
          />
        </View>

        <View
          style={{ flex: 1, marginVertical: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('../../resources/icons/clock.png')} />
            <Text style={{ color: '#C9CDD4' }}>{time}</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image style={{ marginRight: 10, width: 15, height: 15 }} source={require('../../resources/icons/calendar.png')} />
            <Text style={{ color: '#C9CDD4' }}>{date}</Text>
          </View>
          <View
            style={{
              borderRadius: 5,
              backgroundColor: item.currentStatus.colorCode
            }}
          >
            <Text style={{ color: '#FFF', fontSize: 10, paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 15 }}>
              {item.currentStatus.codeName}
            </Text>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(74,137,232,0.5)',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10
          }}
        >
          <Text style={{ flex: 1, color: '#FFF', fontSize: 12, fontWeight: 'bold' }} numberOfLines={1}>
            Tôi cần một dịch vụ quản lý thật tốt ...
          </Text>
          <View
            style={{
              width: 15,
              height: 15,
              backgroundColor: 'red',
              borderRadius: 8,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ fontWeight: 'bold', color: '#FFF', fontSize: 9 }}>1</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
}

export default Connect(TabWorkOrder);
