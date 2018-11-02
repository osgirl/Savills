import Connect from '@stores';
import layout from './layout';

class SelectProject extends layout {

    _gotoChooseApartment(project) {
        this.props.navigation.navigate('SelectApartment', { project: project });
    }

}

export default Connect(SelectProject);
