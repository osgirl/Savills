import React, { Component } from 'react';

import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  PixelRatio,
  // Modal,
  Animated,
  Platform,
  FlatList,
  KeyboardAvoidingView,
  Keyboard
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-picker';
import Modal from 'react-native-modal';
import Header from '@components/header';
import IC_MENU from '@resources/icons/icon_tabbar_active.png';
import ImageViewer from 'react-native-image-zoom-viewer';
import HeaderTitle from '@components/headerTitle';
const { width } = Dimensions.get('window');
import Resolution from '../../../utils/resolution';
import Button from '@components/button';
import Connect from '@stores';
import Loading from "@components/loading";
import { isIphoneX } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import AnimatedTitle from "@components/animatedTitle";
import Language from '../../../utils/language';

const HEADER_MAX_HEIGHT = 60;

class ModalNewInbox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      comment: '',
      scrollY: new Animated.Value(
        Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
      ),
      isShowTitleHeader: false,
      isShowModalConfirm: false,
      loading: false
    };
  }

  async componentWillReceiveProps(nextProps) {

    if (this.props.inbox.addInbox !== nextProps.inbox.addInbox && nextProps.inbox.addInbox.success) {
      if (this.state.isShowModalConfirm) {
        await this.setState({ isShowModalConfirm: false })
      }
      await this.setState({ loading: false });
      await this.props.onClose();
    }


  }

  getModuleCount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let unitID = this.props.units.unitActive.unitId;
    this.props.actions.notification.getListCountModule(accessTokenApi, unitID);
  }

  handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {
      listener: event => {
        if (event.nativeEvent.contentOffset.y > 10) {
          if (!this.showCenter) {
            this.showCenter = true;
            this.setState({ isShowTitleHeader: true });
          }
        } else {
          if (this.showCenter) {
            this.showCenter = false;
            this.setState({ isShowTitleHeader: false });
          }
        }
      }
    })(event);
  };

  _createInbox = async () => {
    this.setState({ loading: true })
    let accessTokenAPI = this.props.account.accessTokenAPI;
    await this.props.actions.inbox.addInbox(accessTokenAPI, this.state.title, this.state.comment)
  }

  renderHeader() {
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;
    return <View>
      <Header
        LinearGradient={true}
        leftIcon={require('../../../resources/icons/close.png')}
        leftAction={() => this.props.onClose()}
        headercolor={'transparent'}
        showTitleHeader={this.state.isShowTitleHeader}
        center={
          <View>
            <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{LG.IB_CR_TITLEHEADER}</Text>
          </View>
        }
      />
      <AnimatedTitle
        scrollY={this.state.scrollY}
        label={LG.IB_CR_TITLEHEADER}
      />
    </View>
  }

  render() {
    const { fullUnitCode } = this.props.units.unitActive;
    let LG = Language.listLanguage[this.props.app.languegeLocal].data;

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.renderHeader()}
        <ScrollView
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
          contentContainerStyle={{
            paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
          }}
          contentInset={{
            top: HEADER_MAX_HEIGHT,
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT,
          }}
          style={{ zIndex: -3 }}
        >
          {/* <KeyboardAvoidingView behavior="position" enabled> */}
          <KeyboardAwareScrollView extraScrollHeight={50}>
            <ItemScorll
              title={LG.IB_CR_TITLE}
              view={
                <TextInput
                  style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                    borderRadius: 5,
                    width: null,
                    padding: Resolution.scale(10),
                    paddingTop: Resolution.scale(10),
                    fontSize: Resolution.scale(14),
                    fontFamily: 'OpenSans-Regular'
                  }}
                  returnKeyType={'done'}
                  autoCapitalize="sentences"
                  autoCorrect={true}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  multiline
                  placeholder={LG.IB_CR_ENTER_TITLE}
                  onChangeText={e => this.setState({ title: e })}
                />
              }
            />

            <ItemScorll
              title={LG.IB_CR_DESCRIPT}
              view={
                <TextInput
                  style={{
                    flex: 1,
                    backgroundColor: '#FFF',
                    borderRadius: 5,
                    height: Resolution.scaleHeight(100),
                    width: null,
                    padding: Resolution.scale(10),
                    paddingTop: Resolution.scale(20),
                    marginBottom: Resolution.scale(170),
                    // borderWidth: 1,
                    // borderColor: this.state.comment.trim() === '' ? 'red' : '#FFF',
                    fontSize: Resolution.scale(14),
                    fontFamily: 'OpenSans-Regular'
                  }}
                  returnKeyType={'done'}
                  autoCapitalize="sentences"
                  autoCorrect={true}
                  onSubmitEditing={() => Keyboard.dismiss()}
                  multiline
                  placeholder={LG.IB_CR_ENTER_DESCRIPT}
                  onChangeText={e => this.setState({ comment: e })}
                />
              }
            />
            {/* </KeyboardAvoidingView> */}
          </KeyboardAwareScrollView>
        </ScrollView >
        <View
          style={{
            width: width,
            height: Resolution.scale(70),
            backgroundColor: '#FFF',
            padding: Resolution.scale(20),
            shadowColor: '#000',
            shadowOpacity: 0.2,
            shadowOffset: { width: 0, height: 7 }
          }}
        >
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: '#01C772', borderRadius: 5, alignItems: 'center', justifyContent: 'center' }}
            onPress={() => {
              if (this.state.title.trim() === '') {
                alert('Thiếu title');
              } else if (this.state.comment.trim() === '') {
                alert('Thiếu Comment');
              } else {
                this.setState({ isShowModalConfirm: true });
              }
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: Resolution.scale(14) }}>{LG.IB_CR_TITLE_BTN}</Text>
          </TouchableOpacity>
        </View>
        {this.renderModalConfirm()}
      </View >
    );
  }

  renderModalConfirm = () => {
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} visible={this.state.isShowModalConfirm}>
        <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              flex: 1,
              marginHorizontal: Resolution.scale(20),
              marginVertical: Resolution.scale(60),
              backgroundColor: '#f6f8fd',
              borderRadius: 10,
              overflow: 'hidden'
            }}
          >
            <TouchableOpacity
              style={{ position: 'absolute', top: Resolution.scale(20), left: Resolution.scale(20), zIndex: 1 }}
              onPress={() => this.setState({ isShowModalConfirm: false })}
            >
              <Image source={require('../../../resources/icons/close.png')} />
            </TouchableOpacity>
            <LinearGradient
              colors={['#4A89E8', '#8FBCFF']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ width: width, height: Resolution.scaleHeight(60) }}
            />
            <ScrollView style={{ flex: 1, marginBottom: Resolution.scaleHeight(100) }} showsVerticalScrollIndicator={false}>
              <ItemScorll
                title={'Tiêu đề'}
                view={
                  <View
                    style={{
                      width: null,
                      flex: 1,
                      borderRadius: 10,
                      backgroundColor: '#FFF',
                      padding: Resolution.scale(20),
                      justifyContent: 'space-around'
                    }}
                  >
                    {
                      <View
                        style={{ flexDirection: 'row' }}
                      >
                        <Text style={{ color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: Resolution.scale(13) }}>{this.state.title}</Text>
                      </View>

                    }
                  </View>
                }
              />
              <ItemScorll
                title={'Nội dung'}
                view={
                  <View
                    style={{
                      backgroundColor: '#FFF',
                      borderRadius: 5,
                      width: null,
                      padding: Resolution.scale(10),
                      minHeight: Resolution.scale(100),
                      marginBottom: Resolution.scale(20)
                    }}
                  >
                    <Text style={{ fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Regular' }}>{this.state.comment}</Text>
                  </View>
                }
              />
            </ScrollView>
            <Button
              style={{ position: 'absolute', bottom: Resolution.scale(20), left: Resolution.scale(20), width: width - 80, height: Resolution.scale(50) }}
              onPress={() => this._createInbox()}
            >
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                {
                  this.state.loading ?
                    <ActivityIndicator size={'small'} color={'#FFF'} /> :
                    <Text style={{ fontSize: Resolution.scale(15), color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>Send</Text>
                }
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

}

class ItemScorll extends Component {
  render() {
    const { title, view } = this.props;
    return (
      <View style={{ marginHorizontal: Resolution.scale(20) }}>
        <Text style={{ marginTop: Resolution.scale(20), marginBottom: Resolution.scale(10), color: '#505E75', fontSize: Resolution.scale(14), fontWeight: 'bold' }}>{title}</Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalNewInbox);
