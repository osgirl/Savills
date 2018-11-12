import React, { Component } from 'react';

import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  Modal,
  Animated,
  Platform
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Header from '@components/header';
import IC_MENU from '@resources/icons/icon_tabbar_active.png';
import ImageViewer from 'react-native-image-zoom-viewer';
import HeaderTitle from '@components/headerTitle';
const { width } = Dimensions.get('window');
import Resolution from '../../../utils/resolution';
import Button from '@components/button';
import Connect from '@stores';
// const options = {
//   title: 'Chụp ảnh để tải lên',
//   storageOptions: {
//     skipBackup: true,
//     uriImage: '',
//     path: 'images'
//   },
//   quality: 1,
//   mediaType: 'photo',
//   cameraType: 'front',
//   maxWidth: PixelRatio.getPixelSizeForLayoutSize(300), // photos only
//   maxHeight: PixelRatio.getPixelSizeForLayoutSize(150) // photos only
// };

const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  }
};

const HEADER_MAX_HEIGHT = Resolution.scale(140);
const HEADER_MIN_HEIGHT = Resolution.scale(Platform.OS === 'android' ? 50 : 70);
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class ModalNewOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      area: 0,
      imageList: ['1'],
      imageListBase64: [],
      comment: '',
      showImage: false,
      isShowModalConfirm: false,
      imageIndex: 0,
      scrollY: new Animated.Value(0),
      isShowTitleHeader: false
    };
  }

  async componentWillReceiveProps(nextProps) {
    let accessTokenAPI = nextProps.account.accessTokenAPI;
    const { id } = nextProps.userProfile.profile.result.user;

    await nextProps.actions.workOrder.getWorkOrderList(accessTokenAPI, 'ACTIVE', id);
    if (
      nextProps.workOrder.createWorkorder &&
      nextProps.workOrder.createWorkorder.success &&
      !nextProps.workOrder.isCreateWorkOrder
    ) {
      nextProps.actions.workOrder.setFlagCreateWorkOrder();
      if (this.state.imageListBase64.length > 0) {
        for (let i = 0; i < this.state.imageListBase64.length; i++) {
          await this.props.actions.workOrder.uploadImageWorkOrder(
            accessTokenAPI,
            this.state.imageListBase64[i],
            nextProps.workOrder.createWorkorder.result.guid
          );
        }
      }
    }
    await this.props.navigation.goBack();
  }

  actionCreateWorkOrder = () => {
    let accessTokenAPI = this.props.account.accessTokenAPI;
    const { fullUnitCode, buildingId, floorId, unitId } = this.props.units.unitActive;
    const { name, id, phoneNumber, emailAddress, displayName } = this.props.userProfile.profile.result.user;
    let WorkOrder = {
      currentStatusId: 11,
      fullUnitName: `${fullUnitCode} - ${displayName}`,
      fullUnitCode: fullUnitCode,
      buildingId: buildingId,
      floorId: floorId,
      unitId: unitId,
      description: this.state.comment,
      sourceId: 3,
      maintainanceTeamId: 1,
      areaId: 50,
      categoryId: 90,
      subCategoryId: null,
      contact: {
        fullName: name,
        phoneNumber: phoneNumber,
        email: emailAddress,
        memberId: id
      },
      isPrivate: true
    };
    this.props.actions.workOrder.createWorkOrder(accessTokenAPI, WorkOrder);
  };

  changeArea(index) {
    this.setState({ area: index });
  }

  getPhotos() {
    let ListImage = this.state.imageList.slice();
    let ListImageBase64 = this.state.imageListBase64.slice();
    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        const sourceBase64 = response.data;
        ListImageBase64.push(sourceBase64);
        ListImage.push(source);
        // You can also display the image using data:
        // const source = { uri: 'data:image/jpeg;base64,' + response.data };
        this.setState({
          imageListBase64: ListImageBase64,
          imageList: ListImage
        });
      }
    });
  }

  deleteImage = index => {
    let arr = this.state.imageList.slice();
    let arrBase64 = this.state.imageListBase64.slice();
    arrBase64.splice(index - 1, 1);
    arr.splice(index, 1);
    this.setState({ imageList: arr, imageListBase64: arrBase64 });
  };

  showDetailImage() {
    const newData = [];
    {
      this.state.imageList && this.state.imageList.length > 0
        ? this.state.imageList.map(value => {
            if (value == null) {
              return;
            }
            if (value.uri) {
              newData.push({ url: value.uri });
            } else {
              newData.push({ url: value });
            }
          })
        : null;
    }
    return (
      <Modal
        visible={this.state.showImage}
        transparent={false}
        animationType="slide"
        onRequestClose={() => this.setState({ showImage: false })}
      >
        <ImageViewer imageUrls={newData} index={this.state.imageIndex} />
        <TouchableOpacity
          onPress={() => this.setState({ showImage: false })}
          style={{
            position: 'absolute',
            top: 35,
            left: 20,
            width: 50,
            height: 50
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontSize: 18,
              backgroundColor: 'transparent'
            }}
          >
            Close
          </Text>
        </TouchableOpacity>
      </Modal>
    );
  }

  handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
      listener: event => {
        if (event.nativeEvent.contentOffset.y > 60) {
          if (!this.showCenter) {
            this.showCenter = true;
            this.setState({ isShowTitleHeader: true });
            // this.props.navigation.setParams({ eventTitle: 'Events' });
          }
        } else {
          if (this.showCenter) {
            this.showCenter = false;
            // this.props.navigation.setParams({ eventTitle: null });
            this.setState({ isShowTitleHeader: false });
          }
        }
      }
    })(event);
  };

  render() {
    const { fullUnitCode } = this.props.units.unitActive;
    const { phoneNumber, emailAddress, displayName } = this.props.userProfile.profile.result.user;

    const headerHeight = this.state.scrollY.interpolate({
      inputRange: [0, HEADER_SCROLL_DISTANCE],
      outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
      extrapolate: 'clamp'
    });

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.showDetailImage()}
        <ScrollView
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
          contentContainerStyle={{ marginTop: HEADER_MAX_HEIGHT }}
          style={{ flex: 1, backgroundColor: '#F6F8FD' }}
        >
          <ItemScorll
            title={'Thông Tin'}
            view={
              <View
                style={{
                  height: 130,
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
                  <Text style={{ color: '#BABFC8', fontWeight: '500' }}>{`${fullUnitCode} - ${displayName}`}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Mail</Text>
                  <Text style={{ color: '#4A89E8', fontWeight: '500' }}>{emailAddress}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>SĐT</Text>
                  <Text style={{ color: '#4A89E8', fontWeight: '500' }}>{phoneNumber}</Text>
                </View>
              </View>
            }
          />
          <ItemScorll
            title={'Khu Vực'}
            view={
              <View
                style={{
                  height: 110,
                  width: null,
                  flex: 1,
                  borderRadius: 10,
                  backgroundColor: '#FFF',
                  padding: 20,
                  justifyContent: 'space-around'
                }}
              >
                <TouchableOpacity activeOpacity={1} onPress={() => this.changeArea(0)} style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Căn Hộ</Text>
                  <Image
                    source={
                      this.state.area === 0
                        ? require('../../../resources/icons/checked.png')
                        : require('../../../resources/icons/check.png')
                    }
                  />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} onPress={() => this.changeArea(1)} style={{ flexDirection: 'row' }}>
                  <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Công Cộng</Text>
                  <Image
                    source={
                      this.state.area === 0
                        ? require('../../../resources/icons/check.png')
                        : require('../../../resources/icons/checked.png')
                    }
                  />
                </TouchableOpacity>
              </View>
            }
          />
          <ItemScorll
            title={'Hình Ảnh'}
            view={
              <ScrollView
                style={{
                  borderRadius: 10,
                  paddingTop: 10,
                  width: width - 40,
                  height: 130,
                  backgroundColor: '#FFF'
                }}
                showsHorizontalScrollIndicator={false}
                horizontal
              >
                {this.state.imageList.map((item, index) => this.renderItemImage(item, index))}
              </ScrollView>
            }
          />
          <ItemScorll
            title={'Miêu Tả'}
            view={
              <TextInput
                style={{
                  flex: 1,
                  backgroundColor: '#FFF',
                  borderRadius: 5,
                  height: 100,
                  width: null,
                  padding: 10,
                  paddingTop: 20,
                  marginBottom: 170
                }}
                multiline
                placeholder={'Nhập nội dung ...'}
                onChangeText={e => this.setState({ comment: e })}
              />
            }
          />
        </ScrollView>
        <View
          style={{
            width: width,
            height: 70,
            backgroundColor: '#FFF',
            padding: 20,
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 7 }
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#01C772', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => this.setState({ isShowModalConfirm: true })}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>Gửi</Text>
          </TouchableOpacity>
        </View>

        <Animated.View style={{ height: headerHeight, position: 'absolute', top: 0, left: 0, right: 0, overflow: 'hidden' }}>
          <Header
            LinearGradient={true}
            leftIcon={require('../../../resources/icons/close.png')}
            leftAction={() => this.props.navigation.goBack()}
            headercolor={'transparent'}
            showTitleHeader={this.state.isShowTitleHeader}
            center={
              <View>
                <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{'New Order'}</Text>
              </View>
            }
          />
          <LinearGradient
            colors={['#4A89E8', '#8FBCFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ width: width, marginBottom: 20 }}
          >
            <HeaderTitle title={'New Order'} />
          </LinearGradient>
        </Animated.View>
        {this.renderModalConfirmBooking()}
      </View>
    );
  }

  renderModalConfirmBooking = () => {
    const { fullUnitCode } = this.props.units.unitActive;
    const { phoneNumber, emailAddress, displayName } = this.props.userProfile.profile.result.user;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={this.state.isShowModalConfirm}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
        }}
      >
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: 20,
              marginVertical: 60,
              backgroundColor: '#f6f8fd',
              borderRadius: 10,
              overflow: 'hidden'
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
              onPress={() => this.setState({ isShowModalConfirm: false })}
            >
              <Image source={require('../../../resources/icons/close.png')} />
            </TouchableOpacity>
            <Image
              style={{ height: 50, width: null }}
              resizeMode={'cover'}
              source={{
                uri:
                  'https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Article+Image+Update/Triathlon/Build+Swimming+Endurance/carousel.jpg'
              }}
            />
            <ScrollView style={{ flex: 1, marginBottom: 100 }} showsVerticalScrollIndicator={false}>
              <ItemScorll
                title={'Thông Tin'}
                view={
                  <View
                    style={{
                      width: null,
                      borderRadius: 10,
                      backgroundColor: '#FFF',
                      padding: 20,
                      justifyContent: 'space-around'
                    }}
                  >
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Căn Hộ</Text>
                      <Text
                        style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}
                      >{`${fullUnitCode}-${displayName}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Mail</Text>
                      <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>{emailAddress}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>SĐT</Text>
                      <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>{phoneNumber}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Khu Vực</Text>
                      <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Ngoài Nhà</Text>
                    </View>
                  </View>
                }
              />
              <ItemScorll
                title={'Hình Ảnh'}
                view={
                  <ScrollView
                    style={{
                      borderRadius: 10,
                      paddingTop: 10,
                      width: width - 80,
                      height: 130,
                      backgroundColor: '#FFF'
                    }}
                    showsHorizontalScrollIndicator={false}
                    horizontal
                  >
                    {this.state.imageList.map((item, index) => this.renderItemImage(item, index))}
                  </ScrollView>
                }
              />
              <ItemScorll
                title={'Miêu Tả'}
                view={
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      width: null,
                      padding: 10,
                      minHeight: 100,
                      marginBottom: 20
                    }}
                  >
                    <Text>{this.state.comment}</Text>
                  </View>
                }
              />
            </ScrollView>
            <Button
              style={{ position: 'absolute', bottom: 20, left: 20, width: width - 80, height: 50 }}
              onPress={() => this.actionCreateWorkOrder()}
            >
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>Send</Text>
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  renderItemImage = (item, index) => {
    if (index === 0) {
      return (
        <TouchableOpacity
          onPress={() => this.getPhotos()}
          key={index}
          style={{
            width: 90,
            height: 90,
            marginLeft: 20,
            borderRadius: 10,
            marginTop: 10,
            backgroundColor: '#F6F8FD',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <View
            style={{
              width: 50,
              height: 50,
              backgroundColor: '#FFF',
              borderRadius: 25,
              shadowColor: '#000',
              shadowOffset: { width: 1, height: 2 },
              shadowOpacity: 0.16,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Image style={{ width: 25, height: 25 }} resizeMode={'cover'} source={require('../../../resources/icons/plus.png')} />
          </View>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity key={index} onPress={() => this.setState({ showImage: true, imageIndex: index })}>
        <Image style={{ width: 90, height: 90, borderRadius: 10, margin: 10 }} source={item} />
        <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0 }} onPress={() => this.deleteImage(index)}>
          <Image style={{ width: 20, height: 20 }} source={require('../../../resources/icons/close-image.png')} />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };
}

class ItemScorll extends Component {
  render() {
    const { title, view } = this.props;
    return (
      <View style={{ marginHorizontal: 20 }}>
        <Text style={{ marginTop: 20, marginBottom: 10, color: '#505E75', fontSize: 14, fontWeight: 'bold' }}>{title}</Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalNewOrder);
