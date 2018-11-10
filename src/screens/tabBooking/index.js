import React, { Component } from 'react';
import Connect from '@stores';
import { View, Dimensions, Image, TouchableOpacity, Text, FlatList } from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import HeaderTitle from '@components/headerTitle';
import Modal from 'react-native-modal';
import Header from '@components/header';
import IC_BACK from '@resources/icons/back-light.png';

import IC_MENU from '@resources/icons/icon_tabbar_active.png';

import TabComplete from './tabs/tabComplete';
import TabInComming from './tabs/tabInComming';
import TabProcess from './tabs/tabProcess';
import configs from '../../utils/configs';
// import TabBar from './tabs/TabBar';
const { width } = Dimensions.get('window');
class TabBooking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowCategory: false,
      listCategory: []
    };
  }

  componentWillMount = () => {
    let accessTokenApi = this.props.account.accessTokenAPI;

    this.props.actions.booking.getListCategory(accessTokenApi);
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.booking.listCategory && nextProps.booking.listCategory.success) {
      this.setState({ listCategory: nextProps.booking.listCategory.result });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FFF' }}>
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          text="T1-A03-02"
          display={'text'}
          rightAction={() => this._onpenModalSelectUnit()}
        />
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}>
          <HeaderTitle title="Đặt tiện ích" />
          <ScrollableTabView
            tabBarActiveTextColor={'#FFF'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.5)'}
            tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
            tabBarBackgroundColor={'transparent'}
          >
            <TabProcess tabLabel={'Đang Xử Lý'} {...this.props} actions={() => this.clickDetail()} />
            <TabInComming tabLabel={'Sắp Tới'} {...this.props} actions={() => this.clickDetail()} />
            <TabComplete tabLabel={'Hoàn Tất'} {...this.props} actions={() => this.clickDetail()} />
          </ScrollableTabView>
        </LinearGradient>
        <View
          style={{
            backgroundColor: '#FFF',
            width: width,
            height: 60,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.16
          }}
        />
        <TouchableOpacity
          onPress={() => this.setState({ isShowCategory: true })}
          style={{
            borderRadius: 25,
            width: 50,
            height: 50,
            position: 'absolute',
            bottom: 30,
            left: width / 2 - 25,
            backgroundColor: '#01C772',
            shadowColor: '#4DD49A',
            shadowOffset: { width: 3, height: 6 },
            shadowOpacity: 0.3,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Image source={require('../../resources/icons/plush-addnew.png')} />
        </TouchableOpacity>
        {this.renderModalCategory()}
      </View>
    );
  }

  clickDetail = () => {
    this.props.navigation.navigate('ModalDetailBooking');
  };

  renderModalCategory() {
    return (
      <Modal
        style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 200 }}
        isVisible={this.state.isShowCategory}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: 50,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              flexDirection: 'row',
              backgroundColor: '#FFF',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20
            }}
          >
            <TouchableOpacity onPress={() => this.setState({ isShowCategory: false })}>
              <Image source={require('../../resources/icons/close-image.png')} />
            </TouchableOpacity>
            <Text>#676</Text>
            <TouchableOpacity>
              <Image source={require('../../resources/icons/close-image.png')} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
            <FlatList
              data={this.state.listCategory}
              keyExtractor={(item, index) => item.amenityId.toString()}
              renderItem={({ item, index }) => (
                <ItemCategory index={index} item={item} actins={() => this.gotoCreateBooking(item)} />
              )}
            />
          </View>
        </View>
      </Modal>
    );
  }

  gotoCreateBooking = item => {
    this.setState({ isShowCategory: false }, () => {
      setTimeout(() => {
        this.props.navigation.navigate('ModalNewBooking', { item: item });
      }, 500);
    });
  };
}

class ItemCategory extends Component {
  render() {
    const { amenityName, iconPath } = this.props.item;
    return (
      <TouchableOpacity
        onPress={() => this.props.actins()}
        style={{
          width: width - 40,
          height: 70,
          borderRadius: 10,
          backgroundColor: '#FFF',
          marginHorizontal: 20,
          marginVertical: 10,
          flexDirection: 'row',
          padding: 20,
          alignItems: 'center'
        }}
      >
        <Image
          style={{ width: 30, height: 30, marginRight: 10 }}
          resizeMode={'cover'}
          source={{ uri: configs.API_BOOKING + iconPath }}
        />
        <Text style={{ color: '#515E6D', fontSize: 14, fontWeight: '600' }}>{amenityName}</Text>
      </TouchableOpacity>
    );
  }
}

export default Connect(TabBooking);
