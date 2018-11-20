import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Dimensions, Image, RefreshControl, ActivityIndicator } from 'react-native';
import moment from 'moment';
const { width } = Dimensions.get('window');
import Connect from '@stores';
import EmptyItemList from '@components/emptyItemList';
import ItemBooking from '@components/itemBooking';
class TabActive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isRefreshing: false,
      isLoadData: true
    };
  }

  componentDidMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.booking.getListBooking(accessTokenApi, 'ACTIVE');
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.booking.listActive && nextProps.booking.listActive.success) {
      this.setState({ listData: nextProps.booking.listActive.result.items, isRefreshing: false, isLoadData: false });
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

  renderFooter = () => {};

  _onRefresh() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.setState(
      {
        isRefreshing: true
      },
      () => {
        this.props.actions.booking.getListBooking(accessTokenApi, 'ACTIVE');
      }
    );
  }

  clickDetail = item => {
    this.props.navigation.navigate('ModalDetailBooking', { id: item.reservationId });
  };
}

export default Connect(TabActive);
