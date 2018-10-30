import Connect from '@stores';
import layout from './layout';

import _ from "lodash";

class Login extends layout {

    constructor(props) {
        super(props);
        this.state = {
            isModalLanguage: false,
            selectedItem: 1,
            username: '',
            password: '',
            flag: true,
            loading: false
        }
    }

    componentWillMount() {
        // console.log('____', this.props)
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.account.accessToken && nextProps.account.accessToken.length > 0 && !nextProps.account.isGetAccessToken) {
            await this.props.actions.account.setAccessTokenLocal(nextProps.account.accessToken);
            await this.props.actions.account.getTenant(nextProps.account.accessToken);
        }
        if (_.isEmpty(this.props.account.tenantLocal) && nextProps.account.tenant && nextProps.account.tenant.length > 0 && !nextProps.account.isGetTenant) {
            let tenantList = nextProps.account.tenant;
            if (tenantList && tenantList.length === 1) {
                await this.props.actions.account.switchToUserAccount(this.props.account.accessToken, tenantList[0].tenantId, tenantList[0].id);
            } else {
                await this._gotoChooseProject();
                this.setState({ loading: false })
            }
        }


        if (_.isEmpty(nextProps.account.linkedAccountAuthenticate) && !nextProps.account.isGetSwichToUserAccount) {
            let accessToken = this.props.account.accessToken;
            let Token = nextProps.account.switchAccount.switchAccountToken;
            await this.props.actions.account.linkedAccountAuthenticate(accessToken, Token);
        }

        if (!_.isEmpty(nextProps.account.linkedAccountAuthenticate) && !nextProps.account.isGetAccessTokenAPI) {
            await this.props.actions.account.setAccessApiTokenLocal(nextProps.account.linkedAccountAuthenticate.accessToken);
            await this.props.actions.units.getUnits(nextProps.account.linkedAccountAuthenticate.accessToken);
            await this.props.actions.account.setIsAccessTokenAPI();
        }

        if (nextProps.units.statusGetUnit === 100 && this.state.flag) {
            if (nextProps.units.listUnits.items && nextProps.units.listUnits.items.length === 1) {
                await this.props.actions.units.setUnitLocal(nextProps.units.listUnits.items[0]);
                await this.props.navigation.navigate('Home');
                this.setState({ loading: false })
            } else {
                this._gotoChooseApartment(this.props.account.tenantLocal);
                this.setState({ loading: false })
            }
            this.setState({ flag: false })
        }

        if (this.props.account.error !== nextProps.account.error) {
            if (nextProps.account.error) {
                this.setState({ loading: false })
            }
        }





    }

    _login(username, password) {
        this.props.actions.account.login(username, password);
        this.setState({ loading: true })
    }

    _toggleModalLanguage() {
        this.setState({ isModalLanguage: !this.state.isModalLanguage })
    }

    _gotoChooseProject() {
        this.props.navigation.navigate('SelectProject');
    }

    _gotoChooseApartment(project) {
        this.props.navigation.navigate('SelectApartment', { project: project, isLogin: true });
    }

    _gotoForgotPassword() {
        this.props.navigation.navigate('ForgotPassword');
    }


}

export default Connect(Login);
