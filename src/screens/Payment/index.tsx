import React, {FC, useState} from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  Modal,
  Alert,
  FlatList,
} from 'react-native';
import {
  horizontalScale,
  scaleFontSize,
  verticalScale,
} from '../../assets/scaling';
import {Radio} from 'native-base';
import {styles} from './style';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppNavigatorParamList } from '../../navigation/MainNavigation';

interface Address {
  id: number;
  address: string;
}
interface PaymentProps {
  navigation: StackNavigationProp<AppNavigatorParamList, 'Payment'>;
}

const AddressDropDownList: FC = () => {
  const [service, setService] = useState<string>('');
  const [address, setAddress] = useState<number>(1);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const addressList: Address[] = [
    {
      id: 1,
      address: 'No. 23, ABC Street, XYZ area, City, State',
    },
    {
      id: 2,
      address: 'Apt. 676 74041 Forest Plaza, Treenachester, NM 52333-6862',
    },
    {
      id: 3,
      address: 'Apt. 871 48162 Lakin Ports, Columbusview, MD 87423',
    },
    {
      id: 4,
      address: '18041 Kuhn Pine, Oberbrunnerborough, PA 95373',
    },
    {
      id: 5,
      address: 'No. 23, ABC Street, XYZ area, City, State',
    },
  ];
  const selectedAdress: Address | undefined = addressList.find(
    object => object.id === address,
  );
  console.log(selectedAdress);

  const selectingAddress = (id: number) => {
    setAddress(id);
    setModalVisible(!modalVisible);
  };
  const AddressListCard: FC<{address: Address}> = ({address}) => {
    return (
      <Pressable
        style={[
          styles.selectListCard,
          {
            borderBottomWidth: horizontalScale(0.5),
            paddingHorizontal: horizontalScale(10),
            marginRight: horizontalScale(3),
            alignItems: 'center',
          },
        ]}
        onPress={() => selectingAddress(address.id)}>
        <View
          style={{
            flexDirection: 'row',
            gap: 9,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image source={require('../../assets/images/icons/marker.png')} />
          <View style={{height: verticalScale(30)}}>
            <Text numberOfLines={2}>{address.address}</Text>
          </View>
        </View>
      </Pressable>
    );
  };
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modalView}>
          <FlatList
            data={addressList}
            renderItem={({item}) => <AddressListCard address={item} />}
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </Modal>
      <Pressable
        style={[
          styles.selectListCard,
          {
            paddingHorizontal: horizontalScale(15),
            borderTopWidth: horizontalScale(0.3),
          },
        ]}
        onPress={() => setModalVisible(!modalVisible)}>
        <View style={{flexDirection: 'row', gap: 6}}>
          <Image source={require('../../assets/images/icons/marker.png')} />
          <View style={{overflow: 'hidden', width: horizontalScale(255)}}>
            <Text numberOfLines={1}>{selectedAdress?.address}</Text>
          </View>
        </View>
        <Image
          source={require('../../assets/images/icons/chevron-down.png')}
          style={{marginRight: horizontalScale(5)}}
        />
      </Pressable>
    </View>
  );
};

const BillSummaryCard: FC = () => {
  return (
    <View style={styles.billSummaryCard}>
      <Text style={styles.billSummaryText}>Bill Summary</Text>
      <View style={{height: '52%', justifyContent: 'space-evenly'}}>
        <View style={styles.totalCard}>
          <Text style={styles.keysText}>Item Total</Text>
          <Text style={styles.boldText}>₹33</Text>
        </View>
        <View style={styles.totalCard}>
          <Text style={styles.keysText}>Delivery Charge</Text>
          <Text style={styles.boldText}>₹25</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={{marginVertical: 5}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginVertical: verticalScale(3),
          }}>
          <Text style={styles.boldText}>To Pay</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              alignItems: 'center',
            }}>
            <Text style={styles.cutOffPrice}>₹87.49</Text>
            <Text style={[styles.boldText]}>₹87.49</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: verticalScale(3),
          }}>
          <Text>Incl. all taxes and charges</Text>
          <View style={styles.savingCard}>
            <Text style={styles.savingText}>SAVING ₹9.51</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const PaymentPreferred: FC = () => {
  const [value, setValue] = React.useState<string>('one');

  return (
    <View style={styles.paymentPreferredCard}>
      <Text style={styles.paymentPreferredTitle}>Select Preferred Payment</Text>
      <View style={{marginTop: verticalScale(10)}}>
        <Radio.Group
          aria-label="payment method"
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={nextValue => {
            setValue(nextValue);
          }}>
          <View
            style={[
              styles.totalCard,
              {
                height: verticalScale(23),
                marginVertical: verticalScale(10),
              },
            ]}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/icons/cod.png')}
                style={styles.codImage}
              />
              <Text style={styles.paymentPreferredText}>Cash on Delivery</Text>
            </View>
            <Radio value="one" my={1} aria-label="Cash on Delivey" />
          </View>
          <View style={styles.line} />
          <View
            style={[
              styles.totalCard,
              {height: verticalScale(23), marginVertical: verticalScale(15)},
            ]}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Image
                source={require('../../assets/images/icons/online-pay.png')}
                style={styles.payOndelivey}
              />
              <Text style={styles.paymentPreferredText}>Pay Online</Text>
            </View>
            <Radio value="two" my={1} aria-label="Pay Online" />
          </View>
        </Radio.Group>
      </View>
    </View>
  );
};

const Payment: FC <PaymentProps>= ({navigation}) => {
  const gotoOrderSuccess = () => {
    navigation.navigate('OrderSuccess');
  };
  return (
    <View style={styles.mainContainer}>
      {/* Drop Down List  */}
      {/* Drop Down List  */}
      <AddressDropDownList />
      <View
        style={{
          justifyContent: 'space-between',
          flex: 1,
          paddingHorizontal: horizontalScale(20),
          alignItems: 'center',
        }}>
        <BillSummaryCard />
        <PaymentPreferred />
      </View>
      
      <View style={styles.bottomLayout}>
      <Pressable onPress={gotoOrderSuccess}>
        <View style={styles.bottomCard}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 5,
            }}>
            <Text style={styles.bottomCardText}>1 Item</Text>
            {/* <View style={styles.straightLine} /> */}
            <Text
              style={[
                styles.bottomCardText,
                {fontWeight: '900', fontSize: scaleFontSize(24)},
              ]}>
              |
            </Text>
            <Text style={[styles.bottomCardText, {fontWeight: '700'}]}>
              ₹42
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={[styles.bottomCardText, {fontSize: scaleFontSize(18)}]}>
              Pay Now
            </Text>
            <Image
              source={require('../../assets/images/icons/chevron-right.png')}
            />
          </View>
        </View>
        </Pressable>
      </View>
      
    </View>
  );
};

export default Payment;
