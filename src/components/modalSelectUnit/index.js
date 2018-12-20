import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Image, FlatList } from 'react-native';

import Connect from '@stores';
// import LinearGradient from 'react-native-linear-gradient';
import Resolution from '../../utils/resolution';
import Button from '../../components/button';
import Loading from '@components/loading';
import Utils from '../../utils';
import Configs from '../../utils/configs';
import IC_APARTMENT from '@resources/icons/Apartment.png';
import IC_APARTMENT_ACTIVE from '@resources/icons/unit-active.png';
import IC_CLOSE from '@resources/icons/close-black.png';
import Header from '@components/header';

const { width, height } = Dimensions.get('window');

class modalSelectUnit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProject: this.props.account.tenantLocal.slice(),
      projectActive: Object.assign({}, this.props.account.tenantActive),
      unitActive: Object.assign({}, this.props.units.unitActive),
      dataUnits: [],
      loading: false
    };
  }

  async _onPressProject(project) {
    await this.setState({ projectActive: project, loading: true });
    await this.props.actions.account.switchToUserAccount(this.props.account.accessToken, project.tenantId, project.id);
    await this.props.actions.account.setTenantActive(project);
  }

  componentWillMount() {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    this.props.actions.units.getUnits(accessTokenAPI);
    StatusBar.setHidden(false);
    StatusBar.setBarStyle('dark-content');
    // this.flatListRef.scrollToIndex({animated: true, index: "" + 4});
  }

  componentWillUnmount() {
    StatusBar.setBarStyle('light-content');
  }

  async componentWillReceiveProps(nextProps) {
    if (
      this.props.account.switchAccount !== nextProps.account.switchAccount &&
      nextProps.account.switchAccount.success &&
      !nextProps.account.isGetSwichToUserAccount
    ) {
      let accessToken = this.props.account.accessToken;
      let Token = nextProps.account.switchAccount.result.switchAccountToken;
      await this.props.actions.account.linkedAccountAuthenticate(accessToken, Token);
    }

    if (
      this.props.account.switchAccount !== nextProps.account.switchAccount &&
      !nextProps.account.switchAccount.success &&
      !nextProps.account.isGetSwichToUserAccount
    ) {
      alert('faild switchAccount');
      await this.setState({ loading: false });
    }

    if (
      this.props.account.linkedAccountAuthenticate !== nextProps.account.linkedAccountAuthenticate &&
      nextProps.account.linkedAccountAuthenticate.success &&
      !nextProps.account.isGetAccessTokenAPI
    ) {
      await this.props.actions.account.setAccessApiTokenLocal(nextProps.account.linkedAccountAuthenticate.result.accessToken);
      await this.props.actions.account.setEncTokenLocal(nextProps.account.linkedAccountAuthenticate.result.encryptedAccessToken);
      await this.props.actions.userProfile.getCurrentLoginInformations(
        nextProps.account.linkedAccountAuthenticate.result.accessToken
      );
      await this.props.actions.userProfile.getImageUserProfile(nextProps.account.linkedAccountAuthenticate.result.accessToken);
      await this.props.actions.units.getUnits(nextProps.account.linkedAccountAuthenticate.result.accessToken);
      await this.props.actions.account.setIsAccessTokenAPI(true);
    }

    if (
      this.props.account.linkedAccountAuthenticate !== nextProps.account.linkedAccountAuthenticate &&
      !nextProps.account.linkedAccountAuthenticate.success
    ) {
      alert(nextProps.account.linkedAccountAuthenticate.error.message);
      this.setState({ loading: false });
      return;
    }

    if (this.props.units.listUnits !== nextProps.units.listUnits && nextProps.units.listUnits.success) {
      await this.setState({ dataUnits: nextProps.units.listUnits.result.items });
      await this.setState({ loading: false });
    }
  }

  renderItemProject(item) {
    let image = `https://uat.spms.asia/core/TenantCustomization/GetTenantLogo?tenantId=${item.tenantId}`;
    let check = item.tenantId === this.state.projectActive.tenantId ? true : false;
    return (
      <View style={[styles.item, { ...Configs.Shadow, backgroundColor: check ? Configs.colorMain : '#FFFFFF' }]}>
        {check ? (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: image }} style={{ width: Resolution.scaleWidth(30), height: Resolution.scaleHeight(30) }} />
            <Text style={{ color: '#FFF', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>{item.tenancyName}</Text>
          </View>
        ) : (
          <Button onPress={() => this._onPressProject(item)} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={{ uri: image }} style={{ width: Resolution.scaleWidth(30), height: Resolution.scaleHeight(30) }} />
            <Text style={{ color: '#505E75', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>{item.tenancyName}</Text>
          </Button>
        )}
      </View>
    );
  }

  renderItemUnits(item) {
    let check = item.fullUnitCode === this.state.unitActive.fullUnitCode ? true : false;
    return (
      <View style={[styles.item, { ...Configs.Shadow, backgroundColor: check ? Configs.colorMain : '#FFFFFF' }]}>
        {
          // check ?
          //     <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          //         <Image source={IC_APARTMENT_ACTIVE} style={{ width: Resolution.scaleWidth(30), height: Resolution.scaleHeight(30) }} />
          //         <Text style={{ color: '#FFF', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>{item.fullUnitCode}</Text>
          //     </View> :
          <Button onPress={() => this.seletUnits(item)} style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image source={IC_APARTMENT} style={{ width: Resolution.scaleWidth(30), height: Resolution.scaleHeight(30) }} />
            <Text style={{ color: '#505E75', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>
              {item.fullUnitCode}
            </Text>
          </Button>
        }
      </View>
    );
  }

  renderLoading() {
    if (this.state.loading) {
      return <Loading style={{ zIndex: 30 }} visible={this.state.loading} onRequestClose={() => {}} />;
    }
    return null;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  async seletUnits(unit) {
    this.setState({ loading: true });
    const accessTokenApi = this.props.account.accessTokenAPI;
    const buildingID = this.props.units.unitActive.buildingId;
    let date = new Date();
    let firstDay = new Date(date.getFullYear(), 0, 1);
    let lastDay = new Date(date.getFullYear(), 12, 31);
    this.props.actions.events.getMyEvents(accessTokenApi, buildingID, this.timeToString(firstDay), this.timeToString(lastDay));
    this.props.actions.events.getOverviewMyEvents(accessTokenApi, this.timeToString(firstDay), this.timeToString(lastDay));

    await this.props.actions.units.setUnitLocal(unit);
    await this.props.actions.units.getUnitLocal();
    await this.props.actions.units.setUnitDefault(accessTokenApi, unit.unitId);
    this.setState({ loading: false });
    console.log('_______', unit);
    this.props.onClose();
  }

  render() {
    return (
      <View style={[styles.container, {}]}>
        <Header leftIcon={IC_CLOSE} leftAction={() => this.props.onClose()} headercolor={'#F6F8FD'} />
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#505E75', fontSize: 15, marginTop: 20, fontFamily: 'OpenSans-Bold' }}>Choose Your Project</Text>
          <FlatList
            data={this.state.dataProject || []}
            horizontal
            contentContainerStyle={{ paddingVertical: Resolution.scaleHeight(40) }}
            keyExtractor={(item, index) => 'itenmProject__' + index}
            renderItem={({ item, index }) => this.renderItemProject(item)}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            ListHeaderComponent={() => <View style={{ width: 20 }} />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
          />
        </View>

        <View style={{ alignItems: 'center', position: 'absolute', bottom: 50, alignSelf: 'center' }}>
          <Text style={{ color: '#505E75', fontSize: 15, marginTop: 50, fontFamily: 'OpenSans-Bold' }}>
            Choose Your apartment
          </Text>
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            // initialScrollIndex={3}
            data={this.state.dataUnits.length > 0 ? this.state.dataUnits : Utils.dataPlaceholder}
            horizontal
            contentContainerStyle={{ paddingVertical: Resolution.scaleHeight(40) }}
            keyExtractor={(item, index) => 'itenmProject__' + index}
            renderItem={({ item, index }) => this.renderItemUnits(item)}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            ListHeaderComponent={() => <View style={{ width: 20 }} />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
          />
        </View>
        {this.renderLoading()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F8FD'
  },
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: 136,
    height: 136
    // backgroundColor: '#FFFFFF',
  }
});

export default Connect(modalSelectUnit);
