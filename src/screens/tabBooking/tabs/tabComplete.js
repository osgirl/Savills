import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Dimensions, Image, RefreshControl } from 'react-native';
import moment from 'moment';
const { width } = Dimensions.get('window');
import Connect from '@stores';
import EmptyItemList from '@components/emptyItemList';
import ItemBooking from '@components/itemBooking';
import configs from '@utils/configs';

class TabComplete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isRefreshing: false
    };
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.booking.listComplete && nextProps.booking.listComplete.success) {
      this.setState({ listData: nextProps.booking.listComplete.result.items, isRefreshing: false });
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
          renderItem={({ item, index }) => <ItemBooking item={item} index={index} action={() => this.clickDetail(item)} />}
          onScroll={this.props.onScroll}
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={() => this._onRefresh()}
              title={'Refrech Data !!'}
              tintColor="#000"
              titleColor="#000"
            />
          }
          ListEmptyComponent={() => {
            return <EmptyItemList />;
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

  clickDetail = item => {
    this.props.navigation.navigate('ModalDetailBooking', { id: item.reservationId });
  };
}

export default Connect(TabComplete);
