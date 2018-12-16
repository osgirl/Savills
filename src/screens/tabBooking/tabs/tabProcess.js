import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, StatusBar, Platform } from 'react-native';
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
      isRefreshing: false,
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
      this.props.booking.listActive.items !== nextProps.booking.listActive.items &&
      nextProps.booking.listActive.success &&
      this.state.isRefresh
    ) {
      await this.setState({ listData: nextProps.booking.listActive.items });
      await this.setState({ isRefresh: false });
    }
    if (
      this.props.booking.listActive.items !== nextProps.booking.listActive.items &&
      nextProps.booking.listActive.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ listData: this.state.listData.concat(nextProps.booking.listActive.items) });
      await this.setState({ loadingMore: false, isRefresh: false });
    }
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => item.reservationId.toString()}
          data={this.state.listData}
          renderItem={({ item, index }) => <ItemBooking item={item} index={index} action={() => this.clickDetail(item)} />}
          onScroll={this.props.onScroll}
          onEndReached={() => this._onEndReached()}
          onEndReachedThreshold={0.01}
          // scrollEventThrottle={1}
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
          contentContainerStyle={{
            paddingTop: Platform.OS !== 'ios' ? 50 : 0
          }}
          ListEmptyComponent={() => {
            return <EmptyItemList loadData={this.state.isLoadData} />;
          }}
        />
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
    if (this.state.loadingMore || this.state.pageCount == this.props.booking.listActive.pageCount) {
      return;
    }
    await this.setState({ loadingMore: true, pageCount: this.state.pageCount + 1 });
    await this._getList(this.state.pageCount);
  }

  _onRefresh = async () => {
    if (this.state.isRefresh) {
      return;
    }
    await this.setState({ isRefresh: true, pageCount: 1 });
    this._getList();
  };

  _getList() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.booking.getListBooking(accessTokenApi, 'PROCESSING', this.state.pageCount);
  }

  renderFooter = () => {};

  clickDetail = item => {
    this.props.navigation.navigate('ModalDetailBooking', { id: item.reservationId });
  };
}

export default Connect(TabProcess);
