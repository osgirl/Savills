import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, StatusBar, Platform, DeviceEventEmitter } from 'react-native';
import Connect from '@stores';
import EmptyItemList from '@components/emptyItemList';
import ItemBooking from '@components/itemBooking';
import Resolution from '@utils/resolution';
import Configs from '@utils/configs';
import { ItemPlaceHolderH } from '@components/placeHolderItem';
class TabProcess extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isLoadData: true,
      isRefresh: false,
      pageCount: 1,
      loadingMore: false
    };
  }

  componentWillMount = () => {
    this._getList();
  };

  componentDidMount() {
    DeviceEventEmitter.addListener('UpdateListBooking', e => this._onRefresh());
    this._getList();
  }

  async componentWillReceiveProps(nextProps) {
    if (
      nextProps.booking.listActive.success &&
      this.props.booking.listActive.items !== nextProps.booking.listActive.items &&
      this.state.isRefresh
    ) {
      await this.setState({ listData: nextProps.booking.listActive.items, isLoadData: false });
      await this.setState({ isRefresh: false });
    }
    if (
      this.props.booking.listActive.items !== nextProps.booking.listActive.items &&
      nextProps.booking.listActive.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ listData: this.state.listData.concat(nextProps.booking.listActive.items) });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.state.isLoadData == false ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.reservationId + '___' + index}
            data={this.state.listData}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <ItemBooking key={item.reservationId} item={item} index={index} action={() => this.clickDetail(item)} />
            )}
            onScroll={this.props.onScroll}
            legacyImplementation={false}
            onEndReached={() => this._onEndReached()}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.01}
            getItemLayout={(data, index) => ({ length: Resolution.scale(170), offset: Resolution.scale(170) * index, index })}
            // scrollEventThrottle={1}
            // ListFooterComponent={() => this._FooterFlatlist()}
            legacyImplementation={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={() => this._onRefresh()}
                tintColor="#000"
                titleColor="#000"
              />
            }
            ListEmptyComponent={() => {
              return <EmptyItemList message={'Bạn chưa có booking nào \n hãy tạo ngay cho mình \n ở đây nhé !'} />;
            }}
          />
        ) : (
          <ItemPlaceHolderH noMargin />
        )}
      </View>
    );
  }

  _FooterFlatlist() {
    return this.state.loadingMore ? (
      <View style={{ height: Resolution.scaleHeight(40), justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Configs.colorMain} />
      </View>
    ) : (
      <View style={{ height: Resolution.scale(40) }} />
    );
  }

  async _onEndReached() {
    if (this.state.loadingMore || this.state.pageCount > this.props.booking.listActive.totalCount / 10) {
      return;
    }
    await this.setState({ loadingMore: true, pageCount: this.state.pageCount + 1 });
    await this._getList(this.state.pageCount);
  }

  _onRefresh = async () => {
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true, pageCount: 1, isLoadData: true });
    this._getList();
  };

  _getList() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.booking.getListBookingProcess(accessTokenApi, this.state.pageCount, this.props.app.languegeLocal);
  }

  renderFooter = () => {};

  clickDetail = item => {
    this.props.navigation.navigate('ModalDetailBooking', { id: item.reservationId });
  };
}

export default Connect(TabProcess);
