import Connect from '@stores';
import layout from './layout';

class SelectProject extends layout {

    async _gotoChooseApartment(project) {
        // this.props.navigation.navigate('SelectApartment', { project: project });
        await this.props.actions.account.switchToUserAccount(this.props.account.accessToken, project.tenantId, project.id);
    }

}

export default Connect(SelectProject);
