import React, { Component } from 'react';

import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
  Platform,
  WebView,
  ActivityIndicator
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import Header from '@components/header';
import HeaderTitle from '@components/headerTitle';
import Resolution from '../../../utils/resolution';
import Connect from '@stores';
import ImageViewer from 'react-native-image-zoom-viewer';
import HTML from 'react-native-render-html';
import AnimatedTitle from '@components/animatedTitle';
import ModalChat from '@components/modalChat';
import Button from '@components/button';
import _ from 'lodash';
import Configs from '../../../utils/configs';

const { width, height } = Dimensions.get('window');

const HEADER_MAX_HEIGHT = 60;
class ModalDetailFeedback extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scrollY: new Animated.Value(Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0),
      imgSelected: null,
      showImage: false,
      data: null,

      isShowChat: false,
      comment: '',
      listComment: []
    };
  }

  handleScroll = event => {
    Animated.event([{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }], {})(event);
  };

  componentDidMount() {
    const { accessTokenAPI } = this.props.account;
    const { inboxId } = this.props;
    let languege = this.props.app.listLanguage[this.props.app.languegeLocal].id;
    setTimeout(() => {
      this.props.actions.inbox.getDetail(accessTokenAPI, languege, inboxId);
    }, 300);
  }

  componentWillReceiveProps(nextProps) {
    let accessTokenApi = this.props.account.accessTokenAPI;
    if (this.props.inbox.detailInbox.result !== nextProps.inbox.detailInbox.result && nextProps.inbox.detailInbox.success) {
      this.setState({ data: nextProps.inbox.detailInbox.result });
      this.props.actions.inbox.getCommentUnread(accessTokenApi, nextProps.inbox.detailInbox.result.id, 14);
      this.props.actions.inbox.getCommentUser(accessTokenApi, nextProps.inbox.detailInbox.result.guid);
    }

    if (this.props.inbox.listComment !== nextProps.inbox.listComment && nextProps.inbox.listComment.success) {
      this.setState({ listComment: nextProps.inbox.listComment.result.items });
    }

    if (
      nextProps.inbox.addComment &&
      nextProps.inbox.addComment.success &&
      this.props.inbox.addComment != nextProps.inbox.addComment
    ) {
      this.textInput.clear();
      this.props.actions.inbox.getCommentUser(accessTokenApi, nextProps.inbox.detailInbox.result.guid);
    }
  }

  renderLoading() {
    return (
      <View style={{ backgroundColor: '#F6F8FD', justifyContent: 'center', alignItems: 'center', marginTop: HEADER_MAX_HEIGHT }}>
        <ActivityIndicator size={'large'} color={Configs.colorMain} />
      </View>
    );
  }

  addComment = () => {
    if (this.state.comment.trim() === '' || this.state.data === null) {
      return;
    } else {
      let accessTokenAPI = this.props.account.accessTokenAPI;
      const { displayName, profilePictureId } = this.props.userProfile.profile.result.user;
      let comment = {
        conversationId: this.state.data.guid,
        content: this.state.comment,
        typeId: null,
        isPrivate: false,
        userName: displayName,
        profilePictureId: profilePictureId,
        moduleId: 14
      };
      this.props.actions.inbox.addCommentUser(accessTokenAPI, comment);
    }
  };

  renderHeader = (languages) => {
    const isShow = this.state.scrollY.interpolate({
      inputRange: [0, 15],
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });
    return (
      <View>
        <Header
          LinearGradient={true}
          leftIcon={require('../../../resources/icons/close.png')}
          leftAction={() => this.props.onClose()}
          headercolor={'transparent'}
          showTitleHeader={true}
          center={
            <Animated.View style={{ opacity: isShow }}>
              <Text style={{ color: '#fFFF', fontFamily: 'OpenSans-Bold' }}>{languages.IB_DT_TITLEHEADER}</Text>
            </Animated.View>
          }
        />
        <AnimatedTitle scrollY={this.state.scrollY} label={languages.IB_DT_TITLEHEADER} />
      </View>
    )
  }

  render() {
    const { data } = this.state;
    let languages = this.props.app.listLanguage[this.props.app.languegeLocal].data;

    return (
      <View style={{ flex: 1, backgroundColor: '#F6F8FD' }}>
        {this.renderHeader(languages)}
        {
          data ? (
            <ScrollView
              scrollEventThrottle={1}
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
            >
              <View>
                {data.subject && (
                  <ItemScorll
                    title={languages.IB_DT_TITLE}
                    view={
                      <View
                        style={{
                          width: null,
                          flex: 1,
                          borderRadius: 10,
                          backgroundColor: '#FFF',
                          padding: Resolution.scale(20)
                          // justifyContent: 'space-around'
                        }}
                      >
                        <HTML html={data.subject} imagesMaxWidth={width - 90} />
                      </View>
                    }
                  />
                )}
                {data.content && (
                  <ItemScorll
                    title={languages.IB_DT_DESCRIPT}
                    view={
                      <View
                        style={{
                          width: null,
                          flex: 1,
                          borderRadius: 10,
                          backgroundColor: '#FFF',
                          padding: Resolution.scale(20)
                          // justifyContent: 'space-around'
                        }}
                      >
                        <HTML html={data.content} imagesMaxWidth={width - 90} />
                      </View>
                    }
                  />
                )}
                {data.fileUrl && (
                  <ItemScorll
                    title={languages.IB_DT_IMAGE}
                    view={
                      <ScrollView
                        style={{
                          borderRadius: 10,
                          paddingTop: 20,
                          marginBottom: 40,
                          // height: Resolution.scaleHeight(1000),
                          backgroundColor: '#FFF'
                        }}
                        showsHorizontalScrollIndicator={false}
                        horizontal
                      >
                        {this.renderItemImage(data.fileUrl)}
                      </ScrollView>
                    }
                  />
                )}
              </View>
            </ScrollView>
          ) : (
              this.renderLoading()
            )
        }
        {this.showDetailImage()}
        {this.renderContentModalChat()}
      </View>
    );
  }

  renderContentModalChat() {
    let id = this.props.userProfile.profile.result.user.id;
    return (
      <ModalChat
        isVisible={this.state.isShowChat}
        title={this.state.data && this.state.data.id}
        idUser={id}
        listComment={this.state.listComment}
        editableTextInput={this.state.data ? true : false}
        disabledBtn={this.state.comment.trim().length > 0 ? false : true}
        addComment={() => this.addComment()}
        onChangeText={text => this.setState({ comment: text })}
        opacityBtnSend={this.state.comment.trim() == '' ? 0.5 : 1}
        onClose={() => this.setState({ isShowChat: false })}
        refTextInout={input => {
          this.textInput = input;
        }}
      />
    );
  }

  renderItemImage = item => {
    if (item.fileUrl) {
      let encToken = this.props.account.encToken;
      let image = `${item.fileUrl}&encToken=${encodeURIComponent(encToken)}`;
      return (
        <TouchableOpacity onPress={() => this.setState({ showImage: true, imgSelected: image })}>
          <Image
            style={{ width: 90, height: 90, marginLeft: 20, borderRadius: 10 }}
            resizeMode={'cover'}
            source={{
              uri: image
            }}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={() => this.setState({ showImage: true, imageIndex: index })}>
          <Image style={{ width: 90, height: 90, marginLeft: 20, borderRadius: 10 }} resizeMode={'cover'} source={item} />
        </TouchableOpacity>
      );
    }
  };

  showDetailImage() {
    const newData = [];
    {
      this.state.imgSelected ? newData.push({ url: this.state.imgSelected }) : null;
    }
    return (
      <Modal style={{ flex: 1, margin: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} visible={this.state.showImage}>
        <ImageViewer imageUrls={newData} index={0} />
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
}

class ItemScorll extends Component {
  render() {
    const { title, view } = this.props;
    return (
      <View style={{ marginHorizontal: Resolution.scale(20) }}>
        <Text
          style={{
            paddingTop: Resolution.scale(20),
            marginBottom: Resolution.scale(10),
            color: '#505E75',
            fontSize: Resolution.scale(14),
            fontFamily: 'OpenSans-Bold'
          }}
        >
          {title}
        </Text>
        {this.props.view}
      </View>
    );
  }
}

export default Connect(ModalDetailFeedback);
