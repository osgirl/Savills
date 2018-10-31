import Connect from '@stores';
import layout from './layout';

class SelectProject extends layout {

    async _gotoChooseApartment(project) {
        // this.props.navigation.navigate('SelectApartment', { project: project });
        await this.props.actions.account.switchToUserAccount(this.props.account.accessToken, project.tenantId, project.id);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.units.listUnits.success && !nextProps.units.isGetlisUnit) {
            if (nextProps.units.listUnits.result.items && nextProps.units.listUnits.result.items.length > 1) {
                let checkIsDefault = false;
                let itemDefault = null;
                console.log('11')
                nextProps.units.listUnits.result.items.map(item => {
                    if (item.isDefault) {
                        itemDefault = item
                        checkIsDefault = true
                    } else {
                        checkIsDefault = false
                    }
                })

                if (checkIsDefault && itemDefault !== null) {
                    console.log('22')
                    this.props.actions.units.setUnitLocal(itemDefault);
                    this.props.navigation.navigate('Home');
                    this.props.actions.units.setIsGetlisUnit(true);
                } else {
                    console.log('33')
                    this._gotoChooseApartment(this.props.account.tenantLocal);
                    this.props.actions.units.setIsGetlisUnit(true);
                }
            }
        }
    }



}

export default Connect(SelectProject);
