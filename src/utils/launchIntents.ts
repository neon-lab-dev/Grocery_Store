import {Linking} from 'react-native';
import {toast} from '../components/Toast/Toast';

const CallNumber = (phone: number) => Linking.openURL(`tel:${phone}`);
const openWhatsApp = (msg: string, mobile: string) => {
  if (mobile) {
    if (msg) {
      let url = 'whatsapp://send?text=' + msg + '&phone=91' + mobile;
      Linking.openURL(url)
        .then(() => {
          toast.showToast('WhatsApp Opened successfully ');
        })
        .catch(() => {
          toast.showToast('Make sure WhatsApp is installed on your device');
        });
    } else {
      toast.showToast('Something went wrong, try again later');
    }
  } else {
    toast.showToast('Something went wrong, try again later');
  }
};
export {CallNumber, openWhatsApp};
