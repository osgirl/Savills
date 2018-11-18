import React, { Component } from 'react';
import Connect from '@stores';
import {
  View,
  Text,
  Dimensions,
  FlatList,
  ActivityIndicator,
  Image,
  Animated,
  RefreshControl,
  StatusBar,
  StyleSheet,
  Platform
} from 'react-native';

import ScrollableTabView from '@components/react-native-scrollable-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

import Configs from '@utils/configs';
import Header from '@components/header';
import { isIphoneX } from '@utils/func';

import Button from '@components/button';
import EmptyItemList from '@components/emptyItemList';

import IC_BACK from '@resources/icons/back-light.png';
import IC_MENU from '@resources/icons/icon_tabbar_active.png';
const { width } = Dimensions.get('window');
import Resolution from '@utils/resolution';
import Modal from 'react-native-modal';

import ModalSelectUnit from '../../components/modalSelectUnit';
import IC_DROPDOWN from '../../resources/icons/dropDown.png';

const HEADER_MAX_HEIGHT = Resolution.scale(70);
const HEADER_MIN_HEIGHT = Resolution.scale(Platform.OS === 'android' ? 50 : 70);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class TabWorkOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listWorkOrder: [],
      isRefreshing: false,
      isRefreshingComplete: false,
      listWorkOrderComplete: [],
      scrollY: new Animated.Value(0),
      loadingMoreTabActive: false,
      isModalSelectUnit: false,
      isLoadDataComplete: true,
      isLoadDataActive: true
    };
  }

  componentWillMount = async () => {
    let accessTokenApi = this.props.account.accessTokenAPI;
    const { id } = this.props.userProfile.profile.result.user;
    this.props.actions.workOrder.getWorkOrderList(accessTokenApi, 'ACTIVE', id);
    setTimeout(() => {
      this.props.actions.workOrder.getWorkOrderList(accessTokenApi, 'COMPLETED', id);
    }, 1000);
  };

  componentWillReceiveProps = nextProps => {
    if (
      nextProps.workOrder &&
      nextProps.workOrder.listActive &&
      nextProps.workOrder.listActive.success &&
      !nextProps.workOrder.isGetListWorkOrder
    ) {
      nextProps.actions.workOrder.setFlagGetWorkOrderList();
      this.setState({ listWorkOrder: nextProps.workOrder.listActive.result.items, isRefreshing: false, isLoadDataActive: false });
    }
    if (
      nextProps.workOrder &&
      nextProps.workOrder.listComplete &&
      nextProps.workOrder.listComplete.success &&
      !nextProps.workOrder.isGetListWorkOrder
    ) {
      nextProps.actions.workOrder.setFlagGetWorkOrderList();
      this.setState({
        listWorkOrderComplete: nextProps.workOrder.listComplete.result.items,
        isRefreshingComplete: false,
        isLoadDataComplete: false
      });
    }
  };

  handleScroll = event => {
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          if (event.nativeEvent.contentOffset.y > 40) {
            if (!this.showCenter) {
              this.showCenter = true;
              this.setState({ isShowTitleHeader: true });
              // this.props.navigation.setParams({ eventTitle: 'Events' });
            }
          } else {
            if (this.showCenter) {
              this.showCenter = false;
              // this.props.navigation.setParams({ eventTitle: null });
              this.setState({ isShowTitleHeader: false });
            }
          }
        }
      },
      { useNativeDriver: true }
    )(event);
  };

  render() {
    let unitActive = this.props.units.unitActive;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 10, 40, 60],
      outputRange: [60, 40, 10, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const fontSize = this.state.scrollY.interpolate({
      inputRange: [0, 0, 100],
      outputRange: [30, 30, 0],
      extrapolate: 'clamp'
    });
    const opacityText = this.state.scrollY.interpolate({
      inputRange: [0, 60, 100],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacityText2 = this.state.scrollY.interpolate({
      inputRange: [0, 60, 100],
      outputRange: [1, 0.3, 0],
      extrapolate: 'clamp'
    });

    const headerHeight2 = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });
    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Animated.View style={[{ height: headerHeight2 }]}>
          <Header
            LinearGradient={true}
            leftIcon={IC_BACK}
            leftAction={() => this.props.navigation.goBack()}
            headercolor={'transparent'}
            showTitleHeader={this.state.isShowTitleHeader}
            center={
              <View>
                <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>Frontdesk</Text>
              </View>
            }
            renderViewRight={
              <Button
                onPress={() => this.setState({ isModalSelectUnit: true })}
                style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
              >
                <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 14 }}>{unitActive.fullUnitCode}</Text>
                <Image source={IC_DROPDOWN} style={{ marginLeft: 10 }} />
              </Button>
            }
          />
        </Animated.View>
        <LinearGradient colors={['#4A89E8', '#8FBCFF']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }}>
          <Animated.View style={{ height: headerHeight, opacity: opacityText, paddingBottom: 10 }}>
            <Animated.Text
              style={{
                fontSize: 30,
                fontFamily: 'OpenSans-Bold',
                color: '#FFF',
                marginLeft: 20,
                marginBottom: 0,
                opacity: opacityText2
              }}
            >
              Frontdesk
            </Animated.Text>
          </Animated.View>
          <ScrollableTabView
            tabBarActiveTextColor={'#FFF'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.5)'}
            tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
            tabBarBackgroundColor={'transparent'}
          >
            {this.ViewTwo(this.state.listWorkOrder)}
            {this.ViewThree(this.state.listWorkOrderComplete)}
          </ScrollableTabView>
        </LinearGradient>
        <View style={{ backgroundColor: '#FFF', width: width, height: isIphoneX() ? 60 : 40 }} />
        <Button onPress={() => this.props.navigation.navigate('ModalWorkOrder', { profile: 'asd' })} style={styles.ButtonAdd}>
          <Image source={require('../../resources/icons/plush-addnew.png')} />
        </Button>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
      </View>
    );
  }

  clickDetail = item => {
    this.props.navigation.navigate('ModalEditOrder', { id: item.id });
  };

  ViewTwo = list => {
    return (
      <View tabLabel="Deliveries" style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          keyExtractor={(item, index) => item.id.toString()}
          data={list}
          onScroll={this.handleScroll}
          // onScroll={Animated.event([
          //   {
          //     nativeEvent: { contentOffset: { y: this.state.scrollY } }
          //   }
          // ])}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this._onRefresh()}
              tintColor="#000"
              titleColor="#000"
            />
          }
          renderItem={({ item, index }) => this.renderItem(item, index)}
          ListEmptyComponent={() => {
            return <EmptyItemList loadData={this.state.isLoadDataActive} />;
          }}
        />
      </View>
    );
  };

  async _onEndReached() {
    if (this.state.loadingMoreTabActive) {
      return;
    }
    this.setState({ loadingMoreTabActive: true });
    let start = await this.state.listWorkOrder.length;
    let accessTokenAPI = this.props.account.accessTokenAPI;
    await this.props.actions.notification.getListNotification(accessTokenAPI, start);
  }

  _onRefresh() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    const { id } = this.props.userProfile.profile.result.user;
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.props.actions.workOrder.getWorkOrderList(accessTokenApi, 'ACTIVE', id);
      }
    );
  }

  _onRefreshTabComplete() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    const { id } = this.props.userProfile.profile.result.user;
    this.setState(
      {
        isRefreshingComplete: true
      },
      () => {
        this.props.actions.workOrder.getWorkOrderList(accessTokenApi, 'COMPLETED', id);
      }
    );
  }

  ViewThree = list => {
    return (
      <View tabLabel="Instruction" style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.id.toString()}
          data={list}
          onScroll={Animated.event([
            {
              nativeEvent: { contentOffset: { y: this.state.scrollY } }
            }
          ])}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshingComplete}
              onRefresh={() => this._onRefreshTabComplete()}
              tintColor="#000"
              titleColor="#000"
            />
          }
          renderItem={({ item, index }) => this.renderItem(item, index)}
          ListEmptyComponent={() => {
            return <EmptyItemList loadData={this.state.isLoadDataComplete} />;
          }}
        />
      </View>
    );
  };

  renderItem = (item, index) => {
    let date = moment(item.dateCreate).format('l');
    let time = moment(item.dateCreate).format('LT');
    let encToken = this.props.account.encToken;
    let image =
      item.fileUrls && item.fileUrls.length > 0
        ? `${item.fileUrls[0].fileUrl}&encToken=${encodeURIComponent(encToken)}`
        : 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/480px-No_image_available.svg.png';
    return (
      <Button
        onPress={() => this.clickDetail(item)}
        key={item.id}
        style={{
          width: width - 40,
          height: 170,
          borderRadius: 10,
          marginTop: index === 0 ? 20 : 10,
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
          <Image style={{ width: 40, height: 40, borderRadius: 5 }} source={{ uri: image }} />
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
            backgroundColor: 'rgba(186,191,200,0.5)',
            borderRadius: 5,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10
          }}
        >
          <Text style={{ flex: 1, color: '#FFF', fontSize: 12, fontWeight: 'bold' }} numberOfLines={1}>
            {item.lastComment}
          </Text>
        </View>
      </Button>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF'
  },
  textHeader: {
    fontFamily: 'OpenSans-Bold',
    color: '#FFF',
    marginLeft: 20,
    marginBottom: 0
  },
  ButtonAdd: {
    borderRadius: 25,
    width: 50,
    height: 50,
    position: 'absolute',
    bottom: isIphoneX() ? 30 : 20,
    left: width / 2 - 25,
    backgroundColor: '#01C772',
    shadowColor: '#4DD49A',
    shadowOffset: { width: 3, height: 6 },
    shadowOpacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Connect(TabWorkOrder);