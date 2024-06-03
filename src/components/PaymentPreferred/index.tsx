import React, {FC} from 'react';
import {View} from 'react-native';
import {Radio, Text} from 'native-base';
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
              <SvgXml xml={codIcon} height={20} width={20} />
              <Text style={styles.paymentPreferredText}>Cash on Delivery</Text>
            </View>
            <Radio value="one" my={1} aria-label="Cash on Delivery" />
          </View>
          <View style={styles.line} />
          <View
            style={[
              styles.totalCard,
              {height: verticalScale(23), marginVertical: verticalScale(15)},
            ]}>
            <View style={{flexDirection: 'row', gap: 5, alignItems: 'center'}}>
              <SvgXml xml={podIcon} height={20} width={20} />
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
