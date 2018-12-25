import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import moment from 'moment';
import Connect from '@stores';
import EmptyItemList from '@components/emptyItemList';
import ItemBooking from '@components/itemBooking';
import Resolution from '@utils/resolution';
import Configs from '@utils/configs';
import { ItemPlaceHolderH } from '@components/placeHolderItem';
class TabComplete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isRefreshing: false,
      isLoadData: true,
      loadingMore: false,
      isRefresh: false,
      pageCount: 1
    };
  }

  componentWillReceiveProps = async nextProps => {
    if (
      this.props.booking.listComplete.items !== nextProps.booking.listComplete.items &&
      nextProps.booking.listComplete.success &&
      this.state.isRefresh
    ) {
      await this.setState({ listData: nextProps.booking.listComplete.items, isLoadData: false });
      await this.setState({ isRefresh: false });
    }

    if (
      this.props.booking.listComplete.items !== nextProps.booking.listComplete.items &&
      nextProps.booking.listComplete.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ listData: this.state.listData.concat(nextProps.booking.listComplete.items) });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }
  };

  componentDidMount() {
    this._getList();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.state.isLoadData === false ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.reservationId.toString()}
            data={this.state.listData}
            extraData={this.state}
            renderItem={({ item, index }) => <ItemBooking item={item} index={index} action={() => this.clickDetail(item, 2)} />}
            onScroll={this.props.onScroll}
            scrollEventThrottle={16}
            onEndReached={() => this._onEndReached()}
            onEndReachedThreshold={0.01}
            // ListFooterComponent={() => this._FooterFlatlist()}
            legacyImplementation={false}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
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
    if (this.state.loadingMore || this.state.pageCount == this.props.booking.listComplete.pageCount) {
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
    this.props.actions.booking.getListBookingComplete(accessTokenApi, this.state.pageCount, this.props.app.languegeLocal);
  }

  clickDetail = (item, tabIndex) => {
    this.props.navigation.navigate('ModalDetailBooking', { id: item.reservationId, index: tabIndex });
  };
}

export default Connect(TabComplete);
