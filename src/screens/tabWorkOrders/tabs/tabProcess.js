import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, StatusBar, DeviceEventEmitter } from 'react-native';
import moment from 'moment';
import Connect from '@stores';
import EmptyItemList from '@components/emptyItemList';
import ItemWorkOrder from '@components/itemWorkOrder';
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
      this.props.workOrder.listActive.items !== nextProps.workOrder.listActive.items &&
      nextProps.workOrder.listActive.success &&
      this.state.isRefresh
    ) {
      await this.setState({ listData: nextProps.workOrder.listActive.items, isLoadData: false });
      await this.setState({ isRefresh: false });
    }

    if (
      this.props.workOrder.listActive.items !== nextProps.workOrder.listActive.items &&
      nextProps.workOrder.listActive.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ listData: this.state.listData.concat(nextProps.workOrder.listActive.items) });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }
  };

  componentDidMount() {
    DeviceEventEmitter.addListener('UpdateListWorkOrder', e => this._onRefresh());
    this._getList();
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.state.isLoadData === false ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id.toString()}
            data={this.state.listData}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <ItemWorkOrder {...this.props} item={item} key={index} action={() => this.gotoDetail(item, 0)} />
            )}
            onScroll={this.props.onScroll}
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
              return <EmptyItemList message={'Bạn chưa có workOrder nào \n hãy tạo ngay cho mình \n ở đây nhé !'} />;
            }}
          />
        ) : (
          <ItemPlaceHolderH noMargin />
        )}
      </View>
    );
  }

  gotoDetail = (item, tabIndex) => {
    this.props.navigation.navigate('ModalEditOrder', { id: item.id, tabIndex: tabIndex });
  };

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
    if (this.state.loadingMore || this.state.pageCount == this.props.workOrder.listActive.pageCount) {
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
    const { id } = this.props.userProfile.profile.result.user;
    this.props.actions.workOrder.getWorkOrderListActive(accessTokenApi, id, this.state.pageCount, this.props.app.languegeLocal);
  }
}

export default Connect(TabComplete);
