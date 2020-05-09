import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

export default {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
  logoPresentation: {
    width: width < 375 ? '100%' : 300, 
    height: 175,
    marginTop: 10,
    alignSelf: 'center'
  }
};
