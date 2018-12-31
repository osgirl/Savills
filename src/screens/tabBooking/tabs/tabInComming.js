import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, Platform, StatusBar } from 'react-native';

import Connect from '@stores';
import { EmptyItemList, ItemBooking, PlaceHolderItemH } from '@components';

import Resolution from '@utils/resolution';
import Configs from '@utils/configs';
class TabInComming extends PureComponent {
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

  componentDidMount() {
    this._getList();
  }

  componentWillReceiveProps = async nextProps => {
    if (
      this.props.booking.listOnGoing.items !== nextProps.booking.listOnGoing.items &&
      nextProps.booking.listOnGoing.success &&
      this.state.isRefresh
    ) {
      await this.setState({ listData: nextProps.booking.listOnGoing.items, isLoadData: false });
      await this.setState({ isRefresh: false });
    }
    if (
      this.props.booking.listOnGoing.items !== nextProps.booking.listOnGoing.items &&
      nextProps.booking.listOnGoing.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ listData: this.state.listData.concat(nextProps.booking.listOnGoing.items) });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }
  };

  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.state.isLoadData === false ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.reservationId.toString()}
            data={this.state.listData}
            renderItem={({ item, index }) => <ItemBooking item={item} index={index} action={() => this.clickDetail(item)} />}
            onScroll={this.props.onScroll}
            onEndReached={() => this._onEndReached()}
            scrollEventThrottle={16}
            onEndReachedThreshold={0.01}
            extraData={this.state}
            legacyImplementation={false}
            getItemLayout={(data, index) => ({ length: Resolution.scale(170), offset: Resolution.scale(170) * index, index })}
            // ListFooterComponent={() => this._FooterFlatlist()}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefresh}
                onRefresh={() => this._onRefresh()}
                tintColor="#000"
                titleColor="#000"
              />
            }
            ListEmptyComponent={() => {
              return <EmptyItemList message={languages.BK_EMPTY_LIST_COMMING} />;
            }}
          />
        ) : (
          <PlaceHolderItemH noMargin />
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
    if (this.state.loadingMore || this.state.pageCount > this.props.booking.listOnGoing.totalCount / 10) {
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
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    this.props.actions.booking.getListBookingInComming(accessTokenApi, this.state.pageCount, languages);
  }

  clickDetail = item => {
    this.props.navigation.navigate('ModalDetailBooking', { id: item.reservationId });
  };
}

export default Connect(TabInComming);
