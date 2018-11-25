import React, { PureComponent } from 'react';
import { View, FlatList, RefreshControl } from 'react-native';
import moment from 'moment';
import Connect from '@stores';
import EmptyItemList from '@components/emptyItemList';
import ItemBooking from '@components/itemBooking';

class TabComplete extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isRefreshing: false,
      isLoadData: true
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.booking.listComplete && nextProps.booking.listComplete.success) {
      this.setState({ listData: nextProps.booking.listComplete.result.items, isRefreshing: false, isLoadData: false });
    }
  };

  componentDidMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.booking.getListBooking(accessTokenApi, 'HISTORY');
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD', paddingHorizontal: 20 }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={false}
          keyExtractor={(item, index) => item.reservationId.toString()}
          data={this.state.listData}
          renderItem={({ item, index }) => <ItemBooking item={item} index={index} action={() => this.clickDetail(item, 2)} />}
          onScroll={this.props.onScroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this._onRefresh()}
              tintColor="#000"
              titleColor="#000"
            />
          }
          ListEmptyComponent={() => {
            return <EmptyItemList loadData={this.state.isLoadData} />;
          }}
        />
      </View>
    );
  }

  _onRefresh = () => {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.props.actions.booking.getListBooking(accessTokenApi, 'HISTORY');
      }
    );
  };

  clickDetail = (item, tabIndex) => {
    this.props.navigation.navigate('ModalDetailBooking', { id: item.reservationId, index: tabIndex });
  };
}

export default Connect(TabComplete);
