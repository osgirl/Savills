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
            password: ''
        }
    }

    componentWillMount() {
        // console.log('____', this.props)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.account.accessToken && nextProps.account.accessToken.length > 0 && !nextProps.account.isGetAccessToken) {
            this.props.actions.account.setAccessTokenLocal(nextProps.account.accessToken);
            this.props.actions.account.getTenant(nextProps.account.accessToken);
        }
        if (_.isEmpty(this.props.account.tenantLocal) && nextProps.account.tenant && nextProps.account.tenant.length > 0 && !nextProps.account.isGetTenant) {
            let tenantList = nextProps.account.tenant;
            if (tenantList && tenantList.length === 1) {
                this.props.actions.account.setTenantLocal(tenantList[0]);
                this.props.actions.account.switchToUserAccount(this.props.account.accessToken, tenantList[0].tenantId, tenantList[0].id);
                this._gotoChooseApartment();
            } else {
                this.props.actions.account.setTenantLocal(tenantList);
                this._gotoChooseProject();
            }

            // if (tenantList && tenantList.length > 0 && tenantList.length === 1) {

            // } else {
            //     let accessToken = this.props.account.accessToken;
            //     tenantList.map(item => {
            //         let tenantID = item.tenantId;
            //         let userID = item.id;
            //         this.props.actions.account.switchToUserAccount(accessToken, tenantID, userID);
            //     })
            // }
        }
    }

    _login(username, password) {
        this.props.actions.account.login(username, password);
    }

    _toggleModalLanguage() {
        this.setState({ isModalLanguage: !this.state.isModalLanguage })
    }

    _gotoChooseProject() {
        this.props.navigation.navigate('SelectProject');
    }

    _gotoChooseApartment() {
        this.props.navigation.navigate('SelectApartment');
    }


}

export default Connect(Login);
