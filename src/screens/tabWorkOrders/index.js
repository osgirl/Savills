import React, { PureComponent } from 'react';
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

import Header from '@components/header';
import { isIphoneX } from '@utils/func';
import HeaderTitle from '@components/headerTitle';
import Button from '@components/button';

import IC_BACK from '@resources/icons/back-light.png';
const { width } = Dimensions.get('window');
import Resolution from '@utils/resolution';
import Modal from 'react-native-modal';
import IC_DROPDOWN from '../../resources/icons/dropDown.png';

import ModalSelectUnit from '@components/modalSelectUnit';
import { ItemPlaceHolderH } from '@components/placeHolderItem';

const IMAGE = {
  dropDown: require('@resources/icons/dropDown.png'),
  bt_addNew: require('@resources/icons/plush-addnew.png'),
  clock: require('@resources/icons/clock.png'),
  calendar: require('@resources/icons/calendar.png')
};

import TabProcess from './tabs/tabProcess';
import TabComplete from './tabs/tabComplete';

class TabWorkOrder extends PureComponent {
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
    this.props.actions.workOrder.getListArea(accessTokenApi);
    let ida = this.props.navigation.getParam('params', false);
    if (ida.itemtype) {
      this.props.navigation.navigate('ModalEditOrder', { id: ida.itemtype });
    }
  };

  componentWillReceiveProps = nextProps => {};

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

    const opacityText = this.state.scrollY.interpolate({
      inputRange: [0, 30, 60],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [0, -50],
      extrapolate: 'clamp'
    });

    const opacityTextHeader = this.state.scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <Header
          LinearGradient={true}
          leftIcon={IC_BACK}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: opacityTextHeader }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>Yêu cầu</Text>
            </Animated.View>
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
        <LinearGradient
          colors={['#4A89E8', '#8FBCFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: width, zIndex: -10 }}
        >
          <Animated.View
            style={{
              transform: [{ translateY: headerTranslate }],
              height: headerHeight
            }}
          >
            <Animated.View style={{ opacity: opacityText, position: 'absolute' }}>
              <HeaderTitle title={'Yên cầu'} />
            </Animated.View>
          </Animated.View>
        </LinearGradient>

        <LinearGradient
          colors={['#4A89E8', '#8FBCFF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ flex: 1, zIndex: 1 }}
        >
          <ScrollableTabView
            textStyle={{ fontSize: 12, fontFamily: 'OpenSans-SemiBold' }}
            tabBarActiveTextColor={'#FFF'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.9)'}
            tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
            tabBarBackgroundColor={'transparent'}
          >
            <TabProcess onScroll={this.handleScroll} tabLabel={'Đang xủ lý'} {...this.props} />
            <TabComplete onScroll={this.handleScroll} tabLabel={'Hoàn tất'} {...this.props} />
          </ScrollableTabView>
        </LinearGradient>
        <View style={{ backgroundColor: '#FFF', width: width, height: isIphoneX() ? 60 : 40 }} />
        <Button onPress={() => this.props.navigation.navigate('ModalWorkOrder', { profile: 'asd' })} style={styles.ButtonAdd}>
          <Image source={IMAGE.bt_addNew} />
        </Button>
        <Modal style={{ flex: 1, margin: 0 }} isVisible={this.state.isModalSelectUnit}>
          <ModalSelectUnit onClose={() => this.setState({ isModalSelectUnit: false })} />
        </Modal>
      </View>
    );
  }

  clickDetail = (item, tabIndex) => {
    this.props.navigation.navigate('ModalEditOrder', { id: item.id, tabIndex: tabIndex });
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
    zIndex: 1,
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
