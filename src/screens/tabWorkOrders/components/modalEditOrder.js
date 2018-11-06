import React, { Component } from 'react';
import { View, Text, Dimensions, Image, ScrollView, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Connect from '@stores';
import moment from 'moment';
import Header from '@components/header';
import Modal from 'react-native-modal';
import IC_MENU from '@resources/icons/icon_tabbar_active.png';
import Profile from '../../profile';

const STAR_ON = require('../../../resources/icons/Star-big.png');
const STAR_OFF = require('../../../resources/icons/Star.png');

const { width } = Dimensions.get('window');
class ModalEditOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOrder: {},
      isShowChat: false,
      isShowRating: false,
      loading: true,
      vote: 0
    };
  }

  componentWillMount = async () => {
    let id = this.props.navigation.getParam('id', 0);
    await this.props.actions.workOrder.detailWordOrder('asda', id);
  };

  componentWillReceiveProps = nextProps => {
    if (nextProps.workOrder.workOrderDetail && nextProps.workOrder.workOrderDetail.success) {
      this.setState({ detailOrder: nextProps.workOrder.workOrderDetail.result, loading: false });
    }
  };

  render() {
    const { description, fullUnitCode, currentStatus, dateCreate, id } = this.state.detailOrder;
    let date = moment(dateCreate).format('l');
    let time = moment(dateCreate).format('LT');
    console.log('asdajsdasjdklasjdklasdasda', this.state.detailOrder);
    return this.state.loading ? (
      <ActivityIndicator size={'large'} color={'red'} />
    ) : (
      <View style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, backgroundColor: '#F6F8FD', marginBottom: 50 }}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1.0, y: 1.0 }}
            colors={['#4A89E8', '#8FBCFF']}
            style={{ flex: 1, paddingTop: 100 }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 35, margin: 20 }}>#{id}</Text>
          </LinearGradient>
          <ItemScorll
            title={'Thông Tin'}
            view={
              <View
                style={{
                  height: 200,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around'
                }}
              >
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Căn Hộ</Text>
                  <Text style={{ color: '#BABFC8', fontWeight: '500' }}>{fullUnitCode}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Trạng Thái</Text>
                  <View
                    style={{
                      borderRadius: 5,
                      backgroundColor: currentStatus.colorCode
                    }}
                  >
                    <Text style={{ color: '#FFF', fontSize: 10, paddingVertical: 5, fontWeight: 'bold', paddingHorizontal: 15 }}>
                      {currentStatus.codeName}
                    </Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Ngày Gửi</Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 10 }}>
                      <Image
                        style={{ marginRight: 10, width: 15, height: 15 }}
                        source={require('../../../resources/icons/clock.png')}
                      />
                      <Text style={{ color: '#C9CDD4' }}>{time}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <Image
                        style={{ marginRight: 10, width: 15, height: 15 }}
                        source={require('../../../resources/icons/calendar.png')}
                      />
                      <Text style={{ color: '#C9CDD4' }}>{date}</Text>
                    </View>
                  </View>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Khu Vực</Text>
                  <Text style={{ color: '#BABFC8', fontWeight: '500' }}>Căn Hộ</Text>
                </View>
              </View>
            }
          />
          <ItemScorll
            title={'Người Phụ Trách'}
            view={
              <View
                style={{
                  height: 90,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Image
                  style={{ width: 70, height: 70, borderRadius: 35 }}
                  resizeMode={'cover'}
                  source={require('../../../resources/icons/avatar-default.png')}
                />
                <Text style={{ flex: 1, marginLeft: 20 }}>Chưa có người phụ trách</Text>
                <Image source={require('../../../resources/icons/call-disable.png')} />
              </View>
            }
          />
          <ItemScorll
            title={'Hình Ảnh'}
            view={
              <ScrollView
                style={{
                  borderRadius: 10,
                  paddingTop: 20,
                  width: width - 40,
                  height: 130,
                  backgroundColor: '#FFF'
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                {['1', '2', '3', '4', '5', '6'].map((item, index) => this.renderItemImage(index))}
              </ScrollView>
            }
          />
          <ItemScorll
            title={'Miêu Tả'}
            view={
              <View
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  width: null,
                  padding: 10
                }}
              >
                <Text>{description}</Text>
              </View>
            }
          />
        </ScrollView>
        <View
          style={{
            position: 'absolute',
            width: width,
            height: 50,
            backgroundColor: '#FFF',
            bottom: 0,
            padding: 10,
            flexDirection: 'row'
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ isShowRating: true })}
            style={{ flex: 1, backgroundColor: '#01C772', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Hoàn Tất</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#343D4D',
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: 20
            }}
            onPress={() => this.props.navigation.goBack()}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Hủy</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 70,
            right: 20
          }}
          onPress={() => this.setState({ isShowChat: true })}
        >
          <Image source={require('../../../resources/icons/chat-big.png')} />
          <View
            style={{
              width: 16,
              height: 16,
              backgroundColor: 'red',
              borderRadius: 8,
              position: 'absolute',
              top: 0,
              right: 0,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 8 }}> 1</Text>
          </View>
        </TouchableOpacity>
        {this.renderContentModalChat()}
        {this.renderModalRating()}
      </View>
    );
  }

  renderItemImage = index => {
    return <View key={index} style={{ width: 90, height: 90, marginLeft: 20, backgroundColor: 'yellow', borderRadius: 10 }} />;
  };

  voteProduct(data) {
    this.setState({
      vote: data
    });
  }

  renderOneStar = (data, index) => {
    return (
      <TouchableOpacity key={index} onPress={() => this.voteProduct(data)} style={{ marginRight: 10 }}>
        <Image style={{ width: 34, height: 34, resizeMode: 'contain' }} source={data <= this.state.vote ? STAR_ON : STAR_OFF} />
      </TouchableOpacity>
    );
  };

  renderModalRating = () => {
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} isVisible={this.state.isShowRating}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: width - 40,
              borderRadius: 10,
              backgroundColor: '#FFF',
              alignItems: 'center',
              padding: 20
            }}
          >
            <Text style={{ color: '#505E75', fontSize: 60, fontWeight: '700' }}>
              {this.state.vote}
              .0
            </Text>
            <Text
              style={{ textAlign: 'center', color: '#BABFC8', marginTop: 10, fontSize: 14 }}
            >{`Hãy đánh giá dịch vụ của \n Chúng tôi`}</Text>
            <View
              style={{
                width: width - 40,
                height: 34,
                marginVertical: 20,
                backgroundColor: '#FFF',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              {[1, 2, 3, 4, 5].map((data, index) => this.renderOneStar(data, index))}
            </View>
            <TextInput
              style={{
                width: width - 80,
                height: 80,
                marginVertical: 20,
                borderRadius: 10,
                backgroundColor: '#FFF',
                padding: 10,
                paddingTop: 10
              }}
              placeholder={'Nhập nội dung nhận xét'}
              multiline
            />
            <TouchableOpacity onPress={() => this.setState({ isShowRating: false })}>
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  borderRadius: 25,
                  width: width - 80,
                  height: 50,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Send</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  renderContentModalChat() {
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)', paddingTop: 50 }} isVisible={this.state.isShowChat}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: 50,
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              flexDirection: 'row',
              backgroundColor: '#FFF',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 20
            }}
          >
            <TouchableOpacity onPress={() => this.setState({ isShowChat: false })}>
              <Image source={require('../../../resources/icons/close-image.png')} />
            </TouchableOpacity>
            <Text>#676</Text>
            <TouchableOpacity>
              <Image source={require('../../../resources/icons/close-image.png')} />
            </TouchableOpacity>
          </View>
          <ScrollView style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
            <View style={{ width: width, height: 2000 }} />
          </ScrollView>
          <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              width: width - 40,
              position: 'absolute',
              bottom: 20,
              left: 20,
              height: 50,

              borderRadius: 10
            }}
          >
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
              <TextInput
                style={{ flex: 1 }}
                color={'#FFF'}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                placeholder={'Nhập tin nhắn ...'}
              />
              <TouchableOpacity>
                <Image source={require('../../../resources/icons/send-mess.png')} />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </View>
      </Modal>
    );
  }
}

class ItemScorll extends Component {
  render() {
    const { title, view } = this.props;
    return (
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text style={{ marginTop: 20, marginBottom: 10, color: '#505E75', fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalEditOrder);
