import {Linking} from 'react-native';

const CallNumber = (phone: number) => Linking.openURL(`tel:${phone}`);

export {CallNumber};
