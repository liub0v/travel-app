import * as RootNavigation from '../../src/navigation/RootNavigation';
import {showMessage} from 'react-native-flash-message';

export const errorHandler = (error, action = undefined) => {
  if (error.code === 'ECONNABORTED' || error.message === 'Network Error')
    RootNavigation.navigate('ErrorScreen', {action});
  else {
    showMessage({
      message: error.response?.data || error.message,
      type: 'error',
    });
  }
};
