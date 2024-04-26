import React, {FC, useState} from 'react';
import {View, Image} from 'react-native';
import {Radio, Text} from 'native-base';
import {verticalScale} from '../../assets/scaling';
import {styles} from './style';

interface PaymentPreferredProps {
  value: string;
  setValue: (value: string) => void;
}

const PaymentPreferred: FC<PaymentPreferredProps> = ({value, setValue}) => {
  return (
    <View style={styles.paymentPreferredCard}>
      <Text style={styles.paymentPreferredTitle}>Select Preferred Payment</Text>
      <View style={{marginTop: verticalScale(5)}}>
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

export default PaymentPreferred;
