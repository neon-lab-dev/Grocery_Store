import {Toast} from 'native-base';

export const toast = {
  showToast: (message: any, duration = 2500) => {
    Toast.show({
      title: message,
      duration,
      placement: 'bottom',
      backgroundColor: '#7C3AED',
      fontFamily: 'Inter_Regular',
      color: 'primary.50',
      style: {marginBottom: 30},
    });
  },
};
