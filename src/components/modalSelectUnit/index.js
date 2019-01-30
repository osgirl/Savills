import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, Dimensions, Image, FlatList } from 'react-native';

import Connect from '@stores';
// import LinearGradient from 'react-native-linear-gradient';
import Resolution from '../../utils/resolution';
import Button from '../../components/button';
import Loading from '@components/loading';
import Utils from '../../utils';
import Configs from '../../utils/configs';
import LinkApi from '../../utils/linkApi';
import IC_APARTMENT from '@resources/icons/Apartment.png';
import IC_APARTMENT_ACTIVE from '@resources/icons/unit-active.png';
import IC_CLOSE from '@resources/icons/close-black.png';
import Header from '@components/header';

const { width, height } = Dimensions.get('window');

const ITEM_WIDTH = 136;
const ITEM_HEIGHT = 136;

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
    this.flatListUnit = React.createRef();
  }

  scrollToItemUnits = (list = [], activeItemId = {}) => {
    const findItemIndex = list.findIndex(item => item.unitId === activeItemId.unitId);
    if (list.length === 1) {
      return;
    }
    if (findItemIndex === list.length - 1) {
      this.flatListRef.scrollToIndex({ index: findItemIndex, viewOffset: (width / 2 - ITEM_WIDTH / 2) - 40 })
      return;
    }
    if (activeItemId && findItemIndex > 0) {
      this.flatListRef.scrollToIndex({ index: findItemIndex, viewOffset: (width / 2 - ITEM_WIDTH / 2) - ((findItemIndex + 1) * 20) })
    }
  }

  scrollToItemProject = () => {
    const findItemIndex = this.state.dataProject.findIndex(item => item.tenantId === this.state.projectActive.tenantId);
    if (this.state.dataProject.length === 1) {
      return;
    }
    if (findItemIndex === this.state.dataProject.length - 1) {
      this.flatListProjectRef.scrollToIndex({ index: findItemIndex, viewOffset: (width / 2 - ITEM_WIDTH / 2) - 40 })
      return;
    }
    if (projectActive && findItemIndex > 0) {
      this.flatListProjectRef.scrollToIndex({ index: findItemIndex, viewOffset: (width / 2 - ITEM_WIDTH / 2) - ((findItemIndex + 1) * 20) })
    }
  }

  async _onPressProject(project) {
    await this.setState({ projectActive: project, loading: true });
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    await this.props.actions.account.switchToUserAccount(this.props.account.accessToken, project.tenantId, project.id, languages);
    await this.props.actions.account.setTenantActive(project);
  }

  componentDidMount = () => {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    this.props.actions.units.getUnits(accessTokenAPI);
    this.scrollToItemProject(this.state.dataProject, this.state.projectActive);
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
      await this.props.actions.notification.getListNotification(nextProps.account.linkedAccountAuthenticate.result.accessToken);
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
      await this.scrollToItemUnits(this.state.dataUnits, this.state.unitActive);
    }
  }

  renderItemProject(item) {
    let image = `${LinkApi.API}/TenantCustomization/GetTenantLogo?tenantId=${item.tenantId}`;
    let check = item.tenantId === this.state.projectActive.tenantId ? true : false;
    return (
      <Button
        onPress={() => this._onPressProject(item)}
        style={[styles.item, { ...Configs.Shadow, backgroundColor: check ? Configs.colorMain : '#FFFFFF' }]}
      >
        {check ? (
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={{ uri: image }}
              style={{ width: Resolution.scaleWidth(65), height: Resolution.scaleHeight(65), borderRadius: 10 }}
              resizeMode={'contain'}
            />
            <Text style={{ color: '#FFF', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>{item.tenancyName}</Text>
          </View>
        ) : (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Image
                source={{ uri: image }}
                style={{ width: Resolution.scaleWidth(70), height: Resolution.scaleHeight(70) }}
                resizeMode={'contain'}
              />
              <Text style={{ color: '#505E75', fontSize: 12, marginTop: 10, fontFamily: 'OpenSans-Bold' }}>{item.tenancyName}</Text>
            </View>
          )}
      </Button>
    );
  }

  renderItemUnits = (item) => {
    let check = item.fullUnitCode === this.state.unitActive.fullUnitCode ? true : false;
    return (
      <Button
        onPress={() => this.seletUnits(item)}
        style={[styles.item, { ...Configs.Shadow, backgroundColor: check ? Configs.colorMain : '#FFFFFF' }]}>
        {
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Image
              source={check ? IC_APARTMENT_ACTIVE : IC_APARTMENT}
              style={{ width: Resolution.scaleWidth(30), height: Resolution.scaleHeight(30) }}
            />
            <Text
              style={{
                color: check ? '#FFF' : '#505E75',
                fontSize: 12,
                marginTop: 10,
                fontFamily: 'OpenSans-Bold'
              }}
            >
              {item.fullUnitCode}
            </Text>
          </View>
        }
      </Button>
    );
  }

  renderLoading() {
    if (this.state.loading) {
      return <Loading style={{ zIndex: 30 }} visible={this.state.loading} onRequestClose={() => { }} />;
    }
    return null;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }

  getItemLayout = (data, index) => (
    { length: ITEM_WIDTH, offset: ITEM_WIDTH * index, index }
  )


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
    await this.props.actions.notification.getListCountModule(accessTokenApi, unit.unitId);
    this.setState({ loading: false });
    this.props.onClose();
  }

  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={[styles.container, {}]}>
        <Header leftIcon={IC_CLOSE} leftAction={() => this.props.onClose()} headercolor={'#F6F8FD'} />
        <View style={{ alignItems: 'center', flex: 1 }}>
          <Text style={{ color: '#505E75', fontSize: 15, marginTop: 20, fontFamily: 'OpenSans-Bold' }}>
            {languages.MODAL_SELECT_UNIT_PROJECT}
          </Text>
          <FlatList
            data={this.state.dataProject || []}
            horizontal
            style={{ flex: 1, }}
            ref={ref => {
              this.flatListProjectRef = ref;
            }}
            getItemLayout={this.getItemLayout}
            contentContainerStyle={{ paddingVertical: Resolution.scaleHeight(40) }}
            keyExtractor={(item, index) => 'itenmProject__' + index}
            renderItem={({ item, index }) => this.renderItemProject(item)}
            showsHorizontalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            ListHeaderComponent={() => <View style={{ width: 20 }} />}
            ListFooterComponent={() => <View style={{ width: 20 }} />}
          />
        </View>

        <View style={{ alignItems: 'center', alignSelf: 'center', flex: 1 }}>
          <Text style={{ color: '#505E75', fontSize: 15, fontFamily: 'OpenSans-Bold' }}>
            {languages.MODAL_SELECT_UNIT_APARTMENT}
          </Text>
          <FlatList
            ref={ref => {
              this.flatListRef = ref;
            }}
            getItemLayout={this.getItemLayout}
            extraData={this.state}
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
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
  }
});

export default Connect(modalSelectUnit);
