import {Linking} from 'react-native';

const CallNumber = (phone: string) => Linking.openURL(`tel:${phone}`);

export {CallNumber};
