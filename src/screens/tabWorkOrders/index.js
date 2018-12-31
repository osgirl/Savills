import React, { PureComponent } from 'react';
import Connect from '@stores';
import { View, Text, Dimensions, Image, Animated, StatusBar, StyleSheet, Platform } from 'react-native';
import { ModalSelectUnit, Header, HeaderTitle } from '@components';

import ScrollableTabView from '@components/react-native-scrollable-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import { isIphoneX } from '@utils/func';

import Button from '@components/button';

const { width } = Dimensions.get('window');
import Modal from 'react-native-modal';

import IC_BACK from '@resources/icons/back-light.png';
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
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.workOrder.getListArea(accessTokenApi, languages);
    let ida = this.props.navigation.getParam('params', false);
    if (ida.itemtype) {
      this.props.navigation.navigate('ModalEditOrder', { id: ida.itemtype });
    }
    this.fetchList();
  };

  fetchList = () => {
    fetch('https://savills.spms.asia/core/api/services/app/WorkOrders/GetListCategory?culture=en', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6Ijg5NDc0IiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZSI6Ijg0NTA0ZWE4Y2VjMDQ5YzVhYjMzYTkxYjkyMjc0MTJmIiwiQXNwTmV0LklkZW50aXR5LlNlY3VyaXR5U3RhbXAiOiIzTkIyS1M2UTJQTkVRT0NMMlBWVURYTkxRS0M0NTNYSCIsIkdlbmRlciI6Ik1hbGUiLCJVbmlxdWVJZCI6ImEyYjJmZmRkLThlMDgtNDk0YS1iZjQ4LTg4NjBkMTIwMzhiOSIsIkVtZXJnZW5jeUNvbnRhY3QiOiIxIiwiRGF0ZU9mQmlydGgiOiIwNi8xMS8yMDE4IDg6NDM6NTMgU0EgKzAwOjAwIiwiQ291bnRyeUNvZGUiOiJWTiIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6WyJVc2VyIiwiQk9DIl0sImh0dHA6Ly93d3cuYXNwbmV0Ym9pbGVycGxhdGUuY29tL2lkZW50aXR5L2NsYWltcy90ZW5hbnRJZCI6IjQiLCJzdWIiOiI4OTQ3NCIsImp0aSI6IjZkMzljZmU3LTc4YjAtNGE2NC1iM2ZiLWZhZjA0NmQyNjM0ZiIsImlhdCI6MTU0NjE4NzUyOSwiU2Vzc2lvbklkIjoiMTA3NzQiLCJTZXNzaW9uVHlwZUlkIjoiMSIsIm5iZiI6MTU0NjE4NzUyOSwiZXhwIjoxNTQ4Nzc5NTI5LCJpc3MiOiJTUE1TLVZpZXRuYW0iLCJhdWQiOiJTUE1TLVZpZXRuYW0ifQ.a49Buis4cBgZJ4KUxZIq0ClmtNANVoQ6MU658mbtecc'
      }
    })
      .then(response => response.json())
      .then(responseJson => {
        console.log('asdlakjsdklasdjalksdjaskldjaskdjaskldasda', responseJson);
        return responseJson;
      })
      .catch(error => {
        console.error(error);
      });
  };

  componentWillReceiveProps = nextProps => {};

  handleScroll = event => {
    const scrollSensitivity = Platform.OS === 'ios' ? 1.5 : 5;
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          const offset = event.nativeEvent.contentOffset.y / scrollSensitivity;
          this.state.scrollY.setValue(offset);
        }
      },
      { useNativeDriver: true }
    )(event);
  };

  render() {
    let unitActive = this.props.units.unitActive;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, 10, 30],
      outputRange: [60, 30, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const headerTranslate = this.state.scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [0, -50],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const fontSize = this.state.scrollY.interpolate({
      inputRange: [0, 0, 100],
      outputRange: [30, 30, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });
    const opacityText = this.state.scrollY.interpolate({
      inputRange: [0, 30, 60],
      outputRange: [1, 0.5, 0],
      extrapolate: 'clamp',
      useNativeDriver: true
    });

    const opacityTextHeader = this.state.scrollY.interpolate({
      inputRange: [0, 30],
      outputRange: [0, 1],
      extrapolate: 'clamp',
      useNativeDriver: true
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
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.WO_REQUEST}</Text>
            </Animated.View>
          }
          renderViewRight={
            <Button
              onPress={() => this.setState({ isModalSelectUnit: true })}
              style={{ flexDirection: 'row', alignItems: 'center', marginRight: 20 }}
            >
              <Text style={{ fontFamily: 'OpenSans-Bold', color: '#FFF', fontSize: 14 }}>{unitActive.fullUnitCode}</Text>
              <Image source={IMAGE.dropDown} style={{ marginLeft: 10 }} />
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
              <HeaderTitle title={languages.WO_REQUEST} />
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
            tabBarActiveTextColor={'#FFF'}
            tabBarInactiveTextColor={'rgba(255,255,255,0.9)'}
            tabBarUnderlineStyle={{ backgroundColor: '#FFF' }}
            tabBarBackgroundColor={'transparent'}
            backgroundColor={'#FFF'}
          >
            <TabProcess onScroll={this.handleScroll} tabLabel={languages.WO_TAB_PROCESS} {...this.props} />
            <TabComplete onScroll={this.handleScroll} tabLabel={languages.WO_TAB_COMPLETE} {...this.props} />
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
    justifyContent: 'center',
    zIndex: 10
  }
});

export default Connect(TabWorkOrder);
