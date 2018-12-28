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
  Keyboard,
  Alert
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
import Loading from '@components/loading';
import { isIphoneX } from 'react-native-iphone-x-helper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AlertWarning from '@components/alertWarning';

import AnimatedTitle from '@components/animatedTitle';

const HEADER_MAX_HEIGHT = 60;

import Language from '../../../utils/language';

class ModalNewFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      isShowTitleHeader: false,
      listTypeFeedback: this.props.feedback.typeFeedback.result,
      projectTypes: [{ name: 'HO', value: 'HO' }, { name: 'Project', value: 'PROJECT' }],
      listCategory: this.props.feedback.listCategory.result || [],
      isShowCategory: false,
      type: '',
      typeProject: '',
      categorySelectedId: null,
      isShowModalConfirm: false,
      isModalError: false,
      messageWarning: ''
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.feedback.createFeedback !== nextProps.feedback.createFeedback && nextProps.feedback.createFeedback.success) {
      if (this.state.isShowModalConfirm) {
        await this.setState({ isShowModalConfirm: false });
      }
      await this.setState({ loading: false });
      await this.props.onClose();
      this.getModuleCount();
    }
  }

  getModuleCount() {
    let accessTokenApi = this.props.account.accessTokenAPI;
    let unitID = this.props.units.unitActive.unitId;
    this.props.actions.notification.getListCountModule(accessTokenApi, unitID);
  }

  _alertError = Title => {
    Alert.alert('Error', Title, { text: 'OK', onPress: () => {} }, { cancelable: false });
  };

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

  _createFeedback(commentBoxSourceId = 3, commentBoxType = '') {
    let languege = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    this.setState({ loading: true });
    let accessTokenApi = this.props.account.accessTokenAPI;
    let unitActive = this.props.units.unitActive;
    let { id, username } = this.props.account.tenantActive;
    this.props.actions.feedback.createFeedback(
      accessTokenApi,
      languege,
      commentBoxSourceId,
      unitActive.buildingId,
      id,
      username,
      unitActive.unitId,
      unitActive.fullUnitCode,
      this.state.categorySelectedId,
      this.state.comment,
      this.state.type
    );
  }

  _changeTypeFeedback(type) {
    console.log(type);
    this.setState({ type: type });
  }

  _changeProjectType(type) {
    this.setState({ typeProject: type });
  }

  _selectCategory(id) {
    this.setState({ categorySelectedId: id });
    if (this.state.isShowCategory) {
      this.setState({ isShowCategory: false });
    }
  }

  renderHeader(languages) {
    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={require('../../../resources/icons/close.png')}
          leftAction={() => this.props.onClose()}
          headercolor={'transparent'}
          showTitleHeader={this.state.isShowTitleHeader}
          center={
            <View>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.FB_CREATE_TITLEHEADER}</Text>
            </View>
          }
        />
        <AnimatedTitle scrollY={this.state.scrollY} label={languages.FB_CREATE_TITLEHEADER} />
      </View>
    );
  }

  render() {
    const { fullUnitCode } = this.props.units.unitActive;
    let category = this.state.listCategory.filter(o => o.id === this.state.categorySelectedId);
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;
    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.renderHeader(languages)}
        <ScrollView
          alwaysBounceVertical={false}
          scrollEventThrottle={16}
          onScroll={this.handleScroll}
          contentContainerStyle={{
            paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0
          }}
          contentInset={{
            top: HEADER_MAX_HEIGHT
          }}
          contentOffset={{
            y: -HEADER_MAX_HEIGHT
          }}
          style={{ zIndex: -3 }}
        >
          {/* <KeyboardAvoidingView behavior="position" enabled> */}
          <KeyboardAwareScrollView extraScrollHeight={50}>
            {this.state.listTypeFeedback && this.state.listTypeFeedback.length > 0 ? (
              <ItemScorll
                title={languages.FB_TYPE_FEEDBACK}
                view={
                  <View
                    style={{
                      // height: Resolution.scaleHeight(110),
                      width: null,
                      flex: 1,
                      borderRadius: 10,
                      backgroundColor: '#FFF',
                      padding: Resolution.scale(20),
                      justifyContent: 'space-around'
                    }}
                  >
                    {this.state.listTypeFeedback.map((item, index) => (
                      <TouchableOpacity
                        key={index}
                        activeOpacity={1}
                        onPress={() => this._changeTypeFeedback(item.typeCode)}
                        style={{ flexDirection: 'row', marginVertical: 5 }}
                      >
                        <Text
                          style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: Resolution.scale(13) }}
                        >
                          {item.name}
                        </Text>
                        <Image
                          source={
                            item.typeCode == this.state.type
                              ? require('../../../resources/icons/checked.png')
                              : require('../../../resources/icons/check.png')
                          }
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                }
              />
            ) : null}
            <Button
              onPress={() => this.setState({ isShowCategory: true })}
              style={{
                backgroundColor: '#FFF',
                marginVertical: Resolution.scale(20),
                marginHorizontal: Resolution.scale(20),
                borderRadius: 5
              }}
            >
              <Text
                style={{
                  padding: Resolution.scale(20),
                  color: '#4A89E8',
                  fontSize: Resolution.scale(13),
                  fontFamily: 'OpenSans-SemiBold'
                }}
              >
                {category.length > 0 ? category[0].name : languages.FB_PROBLEM_FEEDBACK}
              </Text>
            </Button>

            <ItemScorll
              title={languages.FB_PROBLEM}
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
                  placeholder={languages.FB_CONTENT_PROBLEM}
                  onChangeText={e => this.setState({ comment: e })}
                />
              }
            />
            {/* </KeyboardAvoidingView> */}
          </KeyboardAwareScrollView>
        </ScrollView>
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
              let message = '';
              if (this.state.type.trim() === '') {
                this.setState({
                  messageWarning: languages.FB_ALERT_NO_TYPE,
                  isModalError: true
                });
              } else if (this.state.categorySelectedId === null) {
                this.setState({
                  messageWarning: languages.FB_ALERT_NO_FEEDBACK,
                  isModalError: true
                });
              } else if (this.state.comment.trim() === '') {
                this.setState({
                  messageWarning: languages.FB_ALERT_NO_PROBLEM,
                  isModalError: true
                });
              } else {
                this.setState({ isShowModalConfirm: true });
              }
            }}
          >
            <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: Resolution.scale(14) }}>
              {languages.FB_CREATE_BTNSEND}
            </Text>
          </TouchableOpacity>
        </View>
        <AlertWarning
          clickAction={() => this.setState({ isModalError: false })}
          isVisible={this.state.isModalError}
          message={this.state.messageWarning}
        />
        {this.renderCategory(languages)}
        {this.renderModalConfirm(languages)}
      </View>
    );
  }

  renderCategory(languages) {
    return (
      <Modal style={{ flex: 1, margin: 0, paddingTop: 20 }} isVisible={this.state.isShowCategory}>
        <View style={{ flex: 1 }}>
          <View
            style={{
              width: width,
              height: Resolution.scaleHeight(50),
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              flexDirection: 'row',
              backgroundColor: '#FFF',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: Resolution.scale(20)
            }}
          >
            <TouchableOpacity onPress={() => this.setState({ isShowCategory: false })}>
              <Image source={require('@resources/icons/close-black.png')} />
            </TouchableOpacity>
            <Text styl={{ color: '#505E75', fontSize: Resolution.scale(14), fontFamily: 'OpenSans-Bold' }}>
              {languages.FB_PROBLEM_FEEDBACK}
            </Text>
            <View />
          </View>
          <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
            <FlatList
              data={this.state.listCategory || []}
              keyExtractor={(item, index) => item.id.toString()}
              renderItem={({ item, index }) => this.renderItemChilder(item, index)}
              ListHeaderComponent={() => <View style={{ height: Resolution.scaleHeight(20) }} />}
            />
          </View>
        </View>
      </Modal>
    );
  }

  renderModalConfirm = languages => {
    let category = this.state.listCategory.filter(o => o.id === this.state.categorySelectedId);
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
                title={languages.FB_TYPE_FEEDBACK}
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
                      <View style={{ flexDirection: 'row' }}>
                        <Text
                          style={{ flex: 1, color: '#505E75', fontFamily: 'OpenSans-SemiBold', fontSize: Resolution.scale(13) }}
                        >
                          {this.state.type}
                        </Text>
                        <Image source={require('../../../resources/icons/checked.png')} />
                      </View>
                    }
                  </View>
                }
              />
              <Button
                disabled={true}
                onPress={() => this.setState({ isShowCategory: true })}
                style={{
                  backgroundColor: '#FFF',
                  marginVertical: Resolution.scale(20),
                  marginHorizontal: Resolution.scale(20),
                  borderRadius: 5
                }}
              >
                <Text style={{ padding: Resolution.scale(20), fontSize: Resolution.scale(13), fontFamily: 'OpenSans-SemiBold' }}>
                  {category.length > 0 ? category[0].name : languages.FB_PROBLEM_FEEDBACK}
                </Text>
              </Button>
              <ItemScorll
                title={languages.FB_PROBLEM}
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
              style={{
                position: 'absolute',
                bottom: Resolution.scale(20),
                left: Resolution.scale(20),
                width: width - 80,
                height: Resolution.scale(50)
              }}
              onPress={() => this._createFeedback()}
            >
              <LinearGradient
                colors={['#4A89E8', '#8FBCFF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center', borderRadius: 50 }}
              >
                {this.state.loading ? (
                  <ActivityIndicator size={'small'} color={'#FFF'} />
                ) : (
                  <Text style={{ fontSize: Resolution.scale(15), color: '#FFFFFF', fontFamily: 'Opensans-SemiBold' }}>
                    {languages.FB_CREATE_BTNSEND}
                  </Text>
                )}
              </LinearGradient>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };

  renderItemChilder = (item, index) => {
    return (
      <TouchableOpacity
        key={index}
        activeOpacity={1}
        onPress={() => this._selectCategory(item.id)}
        style={{
          flexDirection: 'row',
          height: Resolution.scale(70),
          width: width - Resolution.scale(40),
          marginHorizontal: Resolution.scale(20),
          borderRadius: 10,
          marginVertical: Resolution.scale(5),
          alignItems: 'center',
          backgroundColor: '#FFF',
          paddingHorizontal: Resolution.scale(20)
        }}
      >
        <Text style={{ flex: 1, color: '#343D4D', fontFamily: 'OpenSans-Bold', fontSize: Resolution.scale(13) }}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };
}

class ItemScorll extends Component {
  render() {
    const { title, view } = this.props;
    return (
      <View style={{ marginHorizontal: Resolution.scale(20) }}>
        <Text
          style={{
            marginTop: Resolution.scale(20),
            marginBottom: Resolution.scale(10),
            color: '#505E75',
            fontSize: Resolution.scale(14),
            fontWeight: 'bold'
          }}
        >
          {title}
        </Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalNewFeedback);
