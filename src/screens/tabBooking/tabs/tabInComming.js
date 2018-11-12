import React, { Component } from 'react';
import { Text, View, FlatList, TouchableOpacity, Dimensions, Image, RefreshControl } from 'react-native';
import moment from 'moment';
const { width, height } = Dimensions.get('window');
import Connect from '@stores';
import EmptyItemList from '@components/emptyItemList';
import { isIphoneX } from '../../../utils/func';
import ItemBooking from '@components/itemBooking';
class TabActive extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isRefreshing: false
    };
  }

  componentDidMount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    this.props.actions.booking.getListBooking(accessTokenApi, 'ONGOING');
  }

  componentWillReceiveProps = nextProps => {
    if (nextProps.booking.listOnGoing && nextProps.booking.listOnGoing.success) {
      this.setState({ listData: nextProps.booking.listOnGoing.result.items, isRefreshing: false });
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
        this.props.actions.booking.getListBooking(accessTokenApi, 'ONGOING');
      }
    );
  };

  clickDetail = () => {
    alert('ss');
  };
}

export default Connect(TabActive);
