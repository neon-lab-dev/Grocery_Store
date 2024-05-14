import {Button, Pressable, Text, View} from 'native-base';
import * as React from 'react';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {SvgXml} from 'react-native-svg';
import {orangeLocation} from '../../assets/images/icons/orangeLocation';
import {edit} from '../../assets/images/icons/edit';
import {deleteIcon} from '../../assets/images/icons/delete';
import {StackNavigationProp} from '@react-navigation/stack';
import {AppNavigatorParamList} from '../../navigation/MainNavigation';
import SavedAddressComponent from '../../components/Addresses/SavedAddressComponent';
import {storeAddress} from '../../api/localstorage';

interface SavedAddressProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Addresses'>;
}

const SavedAddress: React.FC<SavedAddressProps> = ({navigation}) => {
  const addressList = [
    {
      id: 1,
      landmark: 'NNR Appartment',
      address: '5-13',
      city: 'Vijayawada',
      state: 'AndhraPradesh',
      pincode: '521325',
      label: 'Home',
    },
    {
      id: 2,
      landmark: 'Near Sachivalayam',
      address: '5-123',
      city: 'Vijayawada',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
    {
      id: 3,

      landmark: 'komalanagar',
      address: '11-221',
      city: 'challapalli',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
    {
      id: 4,
      landmark: 'Malaswaram',
      address: 'Near RiceMill',
      city: 'Malaswaram',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
  ];
  const [Addresses, setAddresses] = React.useState([
    {
      id: 1,
      landmark: 'NNR Appartment',
      address: '5-13',
      city: 'Vijayawada',
      state: 'AndhraPradesh',
      pincode: '521325',
      label: 'Home',
    },
    {
      id: 2,
      landmark: 'Near Sachivalayam',
      address: '5-123',
      city: 'Vijayawada',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
    {
      id: 3,

      landmark: 'komalanagar',
      address: '11-221',
      city: 'challapalli',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
    {
      id: 4,
      landmark: 'Malaswaram',
      address: 'Near RiceMill',
      city: 'Malaswaram',
      state: 'AndhraPradesh',
      pincode: '521345',
      label: 'Work',
    },
  ]);
  const gotoAddAddress = () => {
    navigation.navigate('AddAddress', {title: 'Add'});
  };
  const handleDelete = (index: number) => {
    const updatedAddresses = [...Addresses];
    updatedAddresses.splice(index, 1);
    setAddresses(updatedAddresses);
  };
  React.useEffect(() => {
    storeAddress();
  });
  return (
    <View flex={1} py={verticalScale(10)} bgColor={'accent.50'}>
      {Addresses.map((i, index) => (
        <SavedAddressComponent
          key={index}
          gotoAddAddress={gotoAddAddress}
          deleteAddress={() => handleDelete(index)}
          index={index + 1}
          length={Addresses.length}
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
    </View>
  );
};

export default SavedAddress;
