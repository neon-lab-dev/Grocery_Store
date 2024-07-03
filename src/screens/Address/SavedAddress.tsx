import {Button, ScrollView, View} from 'native-base';
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
import NetInfo from '@react-native-community/netinfo';
import {useDispatch, useSelector} from 'react-redux';
import {setNetworkStatus} from '../../redux/slices/networkSlice.ts'; // Import the action
import {RefreshControl} from 'react-native';

interface SavedAddressProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Addresses'>;
}

const SavedAddress: React.FC<SavedAddressProps> = ({navigation}) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const [loaderVisible, setLoaderVisible] = React.useState(false);
  const [addressList, setAddressList] = React.useState([]);
  const dispatch = useDispatch();
  const isConnected = useSelector(state => state.network.isConnected);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      dispatch(setNetworkStatus(state.isConnected));
    });

    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    fetchAddress();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const fetchAddress = async () => {
    if (isConnected) {
      setLoaderVisible(true);
      const getAddressList = await getAddress();
      setAddressList(getAddressList);
      setLoaderVisible(false);
    } else {
      toast.showToast('Please Check Your Internet connection');
    }
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
    if (isConnected) {
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
    } else {
      toast.showToast('Please Check Your Internet Connection');
    }
  };

  return (
    <ScrollView
      flex={1}
      py={verticalScale(10)}
      bgColor={'accent.50'}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
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
    </ScrollView>
  );
};

export default SavedAddress;
