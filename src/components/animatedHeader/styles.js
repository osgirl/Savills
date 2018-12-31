import { StyleSheet, Platform, Dimensions } from 'react-native';
const { width } = Dimensions.get('window');

export default StyleSheet.create({
  body: {
    // backgroundColor: 'red',
    ...Platform.select({
      ios: {
        zIndex: 1
      }
    })
  },
  headerLabel: {
    color: '#FFF',
    fontSize: 28,
    marginBottom: 10,
    fontFamily: 'OpenSans-Bold',
    marginLeft: 14,
    marginTop: 20,
    // backgroundColor: 'transparent',
    position: 'absolute',
    top: 50,
    ...Platform.select({
      android: {
        paddingTop: 2,
        fontSize: 24,
        top: 48
      }
    })
  },
  headerImage: {
    marginBottom: 0,
    marginLeft: 15,
    width: (width * 1) / 3,
    resizeMode: 'contain',
    position: 'absolute',
    top: 56,
    ...Platform.select({
      android: {
        top: 52
      }
    })
  },
  headerView: {
    width: width,
    height: 70,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 3 },
    borderRadius: 2,
    elevation: 3
  },
  flatlist: {
    paddingTop: 40
  },
  homeMenu: {
    marginLeft: 4,
    position: 'absolute',
    ...Platform.select({
      ios: {
        top: 17
      },
      android: {
        top: 15
      }
    }),
    zIndex: 9,
    backgroundColor: 'red'
  },
  headerRight: {
    position: 'absolute',
    zIndex: 9,

    top: 58,
    right: 10,
    ...Platform.select({
      android: {
        top: 54
      }
    })
  },
  LinerTop: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 80
  },
  Button: {
    position: 'absolute',
    top: 30,
    left: 10,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
