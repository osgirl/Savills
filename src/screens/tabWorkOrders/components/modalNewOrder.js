import React, { PureComponent } from 'react';

import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
  PixelRatio,
  Animated,
  Platform,
  Keyboard,
  DeviceEventEmitter
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import ImageViewer from 'react-native-image-zoom-viewer';

import Header from '@components/header';
import HeaderTitle from '@components/headerTitle';
import Button from '@components/button';
import Loading from '@components/loading';
import Resolution from '@utils/resolution';
import AnimatedTitle from '@components/animatedTitle';
import Connect from '@stores';
import AlertWarning from '@components/alertWarning';
const { width, height } = Dimensions.get('window');
const options = {
  title: 'Select Image',
  storageOptions: {
    skipBackup: true,
    path: 'images'
  },
  quality: 1,
  maxWidth: width, // photos only
  maxHeight: height // photos only
};

const HEADER_MAX_HEIGHT = 60;

class ModalNewOrder extends PureComponent {
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
      loading: false,
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      isShowTitleHeader: false,
      email: this.props.userProfile.profile.result.user.emailAddress,
      sdt: this.props.userProfile.profile.result.user.phoneNumber,
      listArea: this.props.workOrder.listArea.result,
      isShowModalWarning: false,
      message: ''
    };
  }

  async componentWillReceiveProps(nextProps) {
    let accessTokenAPI = nextProps.account.accessTokenAPI;
    const { id } = nextProps.userProfile.profile.result.user;

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
      this.setState({ loading: false });
      DeviceEventEmitter.emit('UpdateListWorkOrder', {});
      await this.props.navigation.goBack();
    }
  }

  actionCreateWorkOrder = () => {
    this.setState({ loading: true, isShowModalConfirm: false });
    let accessTokenAPI = this.props.account.accessTokenAPI;
    const { fullUnitCode, buildingId, floorId, unitId } = this.props.units.unitActive;
    const { name, id, phoneNumber, emailAddress, displayName } = this.props.userProfile.profile.result.user;
    let indexArea = this.state.listArea.filter(item => item.isCheck == true);
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
      areaId: indexArea[0].id,
      categoryId: null,
      subCategoryId: null,
      contact: {
        fullName: name,
        phoneNumber: this.state.sdt,
        email: this.state.email,
        memberId: id
      },
      isPrivate: true
    };
    this.props.actions.workOrder.createWorkOrder(accessTokenAPI, WorkOrder);
  };

  changeArea(index) {
    let arr = this.state.listArea.slice();
    arr.map(item => (item.isCheck = false));
    arr[index].isCheck = true;
    this.setState({
      listArea: arr
    });
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
      <Modal visible={this.state.showImage} style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }}>
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
    Animated.event(
      [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
      {
        listener: event => {
          const offset = event.nativeEvent.contentOffset.y;
          this.state.scrollY.setValue(offset);
        }
      },
      { useNativeDriver: true }
    )(event);
  };

  render() {
    const { fullUnitCode } = this.props.units.unitActive;
    const { phoneNumber, emailAddress, displayName } = this.props.userProfile.profile.result.user;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.renderHeader(languages)}
        {this.showDetailImage()}
        {this.state.loading ? <Loading /> : null}
        <KeyboardAwareScrollView
          scrollEventThrottle={16}
          contentContainerStyle={{
            paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
          }}
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
          innerRef={ref => (this.scroll = ref)}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onScroll={this.handleScroll}
          enableOnAndroid
        >
          <ScrollView style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
            <ItemScorll
              title={languages.WO_NEW_INFO}
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
                    <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>{languages.WO_NEW_APARTMENT}</Text>
                    <Text
                      underlineColorAndroid={'transparent'}
                      style={{ color: '#BABFC8', fontWeight: '500' }}
                    >{`${fullUnitCode} - ${displayName}`}</Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>Mail</Text>
                    <TextInput
                      onChangeText={e => this.setState({ email: e })}
                      value={this.state.email}
                      underlineColorAndroid={'transparent'}
                      style={{ paddingTop: 0, color: '#4A89E8' }}
                    />
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>{languages.WO_NEW_PHONE}</Text>
                    <TextInput
                      onChangeText={e => this.setState({ sdt: e })}
                      value={this.state.sdt}
                      underlineColorAndroid={'transparent'}
                      style={{ paddingTop: 0, color: '#4A89E8' }}
                    />
                  </View>
                </View>
              }
            />
            <ItemScorll
              title={languages.WO_NEW_AREA}
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
                  {this.state.listArea && this.state.listArea.length > 0
                    ? this.state.listArea.map((item, index) => (
                        <TouchableOpacity
                          key={index}
                          activeOpacity={1}
                          onPress={() => this.changeArea(index)}
                          style={{ flexDirection: 'row' }}
                        >
                          <Text style={{ flex: 1, color: '#505E75', fontWeight: '500' }}>{item.name}</Text>
                          <Image
                            source={
                              item.isCheck
                                ? require('../../../resources/icons/checked.png')
                                : require('../../../resources/icons/check.png')
                            }
                          />
                        </TouchableOpacity>
                      ))
                    : null}
                </View>
              }
            />
            <ItemScorll
              title={languages.WO_NEW_IMAGE}
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
              title={languages.WO_NEW_DES}
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
                    marginBottom: 20
                  }}
                  returnKeyType="done"
                  autoCapitalize="sentences"
                  autoCorrect={true}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  multiline
                  placeholder={languages.WO_NEW_CONTENT}
                  onChangeText={e => this.setState({ comment: e })}
                />
              }
            />
          </ScrollView>
        </KeyboardAwareScrollView>
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
            onPress={() => {
              if (this.state.comment.trim() === '') {
                this.setState({ isShowModalWarning: true, message: languages.WO_NEW_EMPTY_DES });
              } else {
                let itemArea =
                  this.state.listArea && this.state.listArea.length > 0
                    ? this.state.listArea.filter(item => item.isCheck == true)
                    : [];
                if (itemArea.length === 0) {
                  this.setState({ isShowModalWarning: true, message: languages.WO_NEW_EMPTY_AREA });
                } else {
                  this.setState({ isShowModalConfirm: true });
                }
              }
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 14 }}>{languages.WO_NEW_SEND}</Text>
          </TouchableOpacity>
        </View>
        {this.renderModalConfirmBooking(languages)}
        <AlertWarning
          isVisible={this.state.isShowModalWarning}
          message={this.state.message}
          clickAction={() => this.setState({ isShowModalWarning: false })}
        />
      </View>
    );
  }

  renderHeader(languages) {
    const isShow = this.state.scrollY.interpolate({
      inputRange: [0, 60],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={require('../../../resources/icons/close.png')}
          leftAction={() => this.props.navigation.goBack()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: isShow }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.WO_NEW_NEW}</Text>
            </Animated.View>
          }
        />
        <AnimatedTitle scrollY={this.state.scrollY} label={languages.WO_NEW_NEW} />
      </View>
    );
  }

  renderModalConfirmBooking = languages => {
    const { fullUnitCode } = this.props.units.unitActive;
    const { displayName } = this.props.userProfile.profile.result.user;
    let itemArea =
      this.state.listArea && this.state.listArea.length > 0 ? this.state.listArea.filter(item => item.isCheck == true) : [];
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} visible={this.state.isShowModalConfirm}>
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
            <LinearGradient
              colors={['#4A89E8', '#8FBCFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: width, height: 50 }}
            />
            <ScrollView style={{ flex: 1, marginBottom: 100 }} showsVerticalScrollIndicator={false}>
              <ItemScorll
                title={languages.WO_NEW_INFO}
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
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {languages.WO_NEW_APARTMENT}
                      </Text>
                      <Text
                        style={{ color: '#BABFC8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}
                      >{`${fullUnitCode}-${displayName}`}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginVertical: 20 }}>
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>Mail</Text>
                      <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>{this.state.email}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {languages.WO_NEW_PHONE}
                      </Text>
                      <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>{this.state.sdt}</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                      <Text style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {languages.WO_NEW_AREA}
                      </Text>
                      <Text style={{ color: '#4A89E8', fontFamily: 'OpenSans-SemiBold', fontSize: 12 }}>
                        {itemArea && itemArea[0] && itemArea[0].name ? itemArea[0].name : ''}
                      </Text>
                    </View>
                  </View>
                }
              />
              <ItemScorll
                title={languages.WO_NEW_IMAGE}
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
                    {this.state.imageList.map((item, index) => {
                      if (index === 0) {
                        return;
                      } else {
                        return (
                          <Image key={index} style={{ width: 90, height: 90, borderRadius: 10, margin: 10 }} source={item} />
                        );
                      }
                    })}
                  </ScrollView>
                }
              />
              <ItemScorll
                title={languages.WO_NEW_DES}
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
                <Text style={{ fontSize: 15, color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>{languages.WO_NEW_SEND}</Text>
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

class ItemScorll extends PureComponent {
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
