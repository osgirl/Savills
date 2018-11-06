import React, { Component } from 'react';
import Connect from '@stores';
import Layout from './layout';
import _ from "lodash";

class Profile extends Layout {

    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isShowModalUpdate: false,
            profile: this.props.profile,
            txtUpdate: '',
            keyUpdate: '',
            avatarSource: ''
        }
    }

    async componentWillReceiveProps(nextProps) {
        if (this.props.userProfile.updateUserProfile !== nextProps.userProfile.updateUserProfile && nextProps.userProfile.updateUserProfile.success) {
            let accessTokenApi = this.props.account.accessTokenAPI;
            this.props.actions.userProfile.getCurrentLoginInformations(accessTokenApi);
        }
    }

    _openModalUpdate(key) {
        switch (key) {
            case 'sdt':
                this.setState({ txtUpdate: this.state.profile.phoneNumber })
                break;
            case 'name':
                this.setState({ txtUpdate: this.state.profile.name })
                break;
            case 'surname':
                this.setState({ txtUpdate: this.state.profile.surname })
                break;

            default:
                break;
        }
        this.setState({ isShowModalUpdate: true, keyUpdate: key })
    }

    async _updateProfile() {
        let tempProfile = Object.assign({}, this.state.profile);
        let accessTokenApi = this.props.account.accessTokenAPI;
        switch (this.state.keyUpdate) {
            case 'sdt':
                tempProfile.phoneNumber = this.state.txtUpdate;
                await this.props.actions.userProfile.updateCurrentUserProfile(accessTokenApi, tempProfile);
                break;
            case 'name':
                tempProfile.name = this.state.txtUpdate;
                await this.props.actions.userProfile.updateCurrentUserProfile(accessTokenApi, tempProfile);
                break;
            case 'surname':
                tempProfile.surname = this.state.txtUpdate;
                await this.props.actions.userProfile.updateCurrentUserProfile(accessTokenApi, tempProfile);
                break;
            default:
                break;
        }
        this.setState({ isShowModalUpdate: false, profile: tempProfile })
    }


}

export default Connect(Profile);

