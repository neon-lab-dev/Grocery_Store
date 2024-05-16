import {Button, Pressable, Text, View} from 'native-base';
import {useIsFocused} from '@react-navigation/native';
import * as React from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import SavedAddressComponent from '../../components/Addresses/SavedAddressComponent';
import {storeAddress} from '../../api/localstorage';
import {deleteAddress, getAddress} from '../../api/auth_routes';
import {toast} from '../../components/Toast/Toast';
import axios from 'axios';
import Loader from '../../components/Loader/Loader';
import {FlatList} from 'react-native';

interface SavedAddressProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Addresses'>;
}

const SavedAddress: React.FC<SavedAddressProps> = ({navigation}) => {
  const [loaderVisible, setLoaderVisible] = React.useState(false);
  const [addressList, setAddressList] = React.useState([]);

  React.useEffect(() => {
    fetchAddress();
  }, []);

  const fetchAddress = async () => {
    setLoaderVisible(true);
    const getAddressList = await getAddress();
    console.log(getAddressList);
    setAddressList(getAddressList);
    setLoaderVisible(false);
  };

  const gotoAddAddress = () => {
    navigation.navigate('AddAddress', {title: 'Add'});
  };
  const handleDelete = async deleteId => {
    try {
      const newArray = addressList.filter(item => item.id !== deleteId);
      setAddressList(newArray);
      const res = await deleteAddress(deleteId);
      console.log(res);
      // setLoaderVisible(false);
      // toast.showToast(res.message || res.errorMessage);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View flex={1} py={verticalScale(10)} bgColor={'accent.50'}>
      {addressList.length !== 0 &&
        addressList.map((i, index) => (
          <SavedAddressComponent
            key={index}
            gotoAddAddress={gotoAddAddress}
            deleteAddress={() => {}}
            index={index + 1}
            length={addressList.length}
            address={i}
          />
        ))}
      <View flex={1} bgColor={'accent.50'} mx={horizontalScale(20)}>
        <Button
          variant={'outline'}
          borderStyle={'dashed'}
          borderRadius={12}
          colorScheme={'muted'}
          borderColor={'primary.500'}
          mt={verticalScale(20)}
          py={verticalScale(15)}
          _text={{
            color: 'primary.400',
            fontFamily: 'Inter_Medium',
            fontSize: scaleFontSize(20),
            lineHeight: 24.2,
            letterSpacing: -0.04,
          }}
          onPress={gotoAddAddress}>
          Add an Address
        </Button>
      </View>
      <Loader isOpen={loaderVisible} />
    </View>
  );
};

export default SavedAddress;
