import {Button, View} from 'native-base';
import {useFocusEffect} from '@react-navigation/native';
import * as React from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';

import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import SavedAddressComponent from '../../components/Addresses/SavedAddressComponent';
import {deleteAddress, getAddress} from '../../api/auth_routes';
import {toast} from '../../components/Toast/Toast';
import Loader from '../../components/Loader/Loader';

interface SavedAddressProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Addresses'>;
}

const SavedAddress: React.FC<SavedAddressProps> = ({navigation}) => {
  const [loaderVisible, setLoaderVisible] = React.useState(false);
  const [addressList, setAddressList] = React.useState([]);

  const fetchAddress = async () => {
    setLoaderVisible(true);
    const getAddressList = await getAddress();
    // console.log(getAddressList);
    setAddressList(getAddressList);
    setLoaderVisible(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      fetchAddress();

      return () => {
        isActive = false;
      };
    }, []),
  );

  const gotoAddAddress = () => {
    navigation.navigate('AddAddress', {title: 'Add'});
  };
  const handleDelete = async deleteId => {
    try {
      setLoaderVisible(true);
      const res = await deleteAddress(deleteId);
      console.log(res);
      if (res.statusCode === 400) {
        fetchAddress();
        setLoaderVisible(false);
        toast.showToast('Please make another address as primary');
      } else {
        fetchAddress();
        setLoaderVisible(false);
        toast.showToast(res.message || res.errorMessage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View flex={1} py={verticalScale(10)} bgColor={'accent.50'}>
      {addressList?.length !== 0
        ? addressList?.map((i, index) => (
            <SavedAddressComponent
              key={index}
              gotoAddAddress={gotoAddAddress}
              deleteAddress={() => handleDelete(i.id)}
              index={index + 1}
              length={addressList.length}
              address={i}
            />
          ))
        : null}
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
