import Connect from '@stores';
import layout from './layout';

class Launcher extends layout {

    componentWillMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login')
        }, 100)
    }

}

export default Connect(Launcher);
