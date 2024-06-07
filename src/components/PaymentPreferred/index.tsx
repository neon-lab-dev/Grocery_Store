import React, {FC, useState} from 'react';
import {Dimensions, View} from 'react-native';
import {Radio, Text,Image} from 'native-base';
import {verticalScale} from '../../assets/scaling';
import {styles} from './style';
import {SvgXml} from 'react-native-svg';
import {codIcon} from '../../assets/images/icons/cod';
import {podIcon} from '../../assets/images/icons/pod';

interface PaymentPreferredProps {
  value: string;
  setValue: (value: string) => void;
}

const PaymentPreferred: FC<PaymentPreferredProps> = ({value, setValue}) => {
  const {width} = Dimensions.get('window');

 
  return (
    <View style={styles.paymentPreferredCard}>
      <Text style={styles.paymentPreferredTitle}>Select Preferred Payment</Text>
      <View style={{marginTop: verticalScale( width < 380 ? 0 : 5)}}>
        <Radio.Group
          aria-label="payment method"
          name="myRadioGroup"
          accessibilityLabel="favorite number"
          value={value}
          onChange={(nextValue: string) => {
            setValue(nextValue);
          }}>
          <View
            style={[
              styles.totalCard,
              {
                height: verticalScale(width < 380 ? 15 : 23),
                marginVertical: verticalScale(width < 380 ? 6 : 10),
              },
            ]}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <SvgXml xml={codIcon} height={20} width={20} />
              <Text style={styles.paymentPreferredText}>Cash on Delivery</Text>
            </View>
            <Radio value="CASH_ON_DELIVERY" my={1} aria-label="Cash on Delivery" />
          </View>
          <View style={styles.line} />
          <View
            style={[
              styles.totalCard,
              {
                height: verticalScale(width < 380 ? 15 : 23),
                marginVertical: verticalScale(width < 380 ? 6 : 15),
              },
            ]}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <SvgXml xml={podIcon} height={20} width={20} />
              <Text style={styles.paymentPreferredText}>Pay Online</Text>
            </View>
            <Radio value="ONLINE_PAYMENT" my={1} aria-label="Pay Online" />
          </View>
          <View style={styles.line} />
          <View
            style={[
              styles.totalCard,
              {
                height: verticalScale(width < 380 ? 15 : 23),
                marginVertical: verticalScale(width < 380 ? 6 : 15),
              },
            ]}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <Image height={6} width={5} source={require('../../assets/images/box.png')}></Image>
              {/* <SvgXml xml={podIcon} height={20} width={20} /> */}
              <Text style={styles.paymentPreferredText}>Pick Up From store</Text>
            </View>
            <Radio value="PICKUP_AT_SHOP" my={1} aria-label="Pick Up From store" />
          </View>
        </Radio.Group>
      </View>
    </View>
  );
};

export default PaymentPreferred;
