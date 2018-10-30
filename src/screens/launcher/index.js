import Connect from '@stores';
import layout from './layout';

import _ from "lodash";

class Launcher extends layout {

    async componentWillMount() {
        await this.props.actions.account.getAccessTokenLocal();
        await this.props.actions.account.getTenantLocal();
        await this.props.actions.account.getAccessApiTokenLocal();
        await this.props.actions.units.getUnitLocal();

        if (this.props.account.accessToken.length > 0
            && this.props.account.accessTokenAPI.length > 0
            && !_.isEmpty(this.props.account.tenantLocal)
            && !_.isEmpty(this.props.units.unitActive)) {
            this.props.navigation.navigate('Home');
        } else {
            this.props.navigation.navigate('Home');
        }
    }

}

export default Connect(Launcher);
