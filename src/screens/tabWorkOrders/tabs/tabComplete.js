import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, StatusBar } from 'react-native';
import Connect from '@stores';

import { EmptyItemList, ItemWorkOrder, PlaceHolderItemH } from '@components';

import Resolution from '@utils/resolution';
import Configs from '@utils/configs';

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
      this.props.workOrder.listComplete.items !== nextProps.workOrder.listComplete.items &&
      nextProps.workOrder.listComplete.success &&
      this.state.isRefresh
    ) {
      await this.setState({ listData: nextProps.workOrder.listComplete.items });
      await this.setState({ isRefresh: false, isLoadData: false });
    }

    if (
      this.props.workOrder.listComplete.items !== nextProps.workOrder.listComplete.items &&
      nextProps.workOrder.listComplete.success &&
      !this.state.isRefresh
    ) {
      await this.setState({ listData: this.state.listData.concat(nextProps.workOrder.listComplete.items) });
      await this.setState({ loadingMore: false, isRefresh: false, isLoadData: false });
    }
  };

  componentDidMount() {
    this._getList();
  }

  render() {
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.state.isLoadData === false ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => item.id.toString()}
            data={this.state.listData}
            extraData={this.state}
            renderItem={({ item, index }) => (
              <ItemWorkOrder {...this.props} item={item} index={index} action={() => this.gotoDetail(item, 1)} />
            )}
            getItemLayout={(data, index) => ({ length: 160, offset: 160 * index, index })}
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
              return <EmptyItemList message={languages.WO_EMPTY_LIST} />;
            }}
          />
        ) : (
          <PlaceHolderItemH noMargin />
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
    if (this.state.loadingMore || this.state.pageCount > this.props.workOrder.listActive.totalCount / 10) {
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
    const { id } = this.props.userProfile.profile.result.user;
    this.props.actions.workOrder.getWorkOrderListComplete(accessTokenApi, id, this.state.pageCount, languages);
  }
}

export default Connect(TabComplete);
