// BillSummaryCard.tsx

import React, { FC } from 'react';
import { View, Text, Center } from 'native-base';
import styles from './styles'; // Import styles from styles.ts (or styles.js)

interface BillSummaryCardProps {
  itemPrice: number;
  deliveryCharge: number;
  price: number;
  cutOffPrice: number;
  savingPrice: number;
}

const BillSummaryCard: FC<BillSummaryCardProps> = ({
  itemPrice,
  deliveryCharge,
  price,
  cutOffPrice,
  savingPrice,
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.billSummaryText}>Bill Summary</Text>
      <View style={styles.rowContainer}>
        <Text style={styles.itemTotalText}>Item Total</Text>
        <Text style={styles.itemPriceText}>₹{itemPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.rowContainer}>
        <Text style={styles.deliveryChargeText}>Delivery Charge</Text>
        <Text style={styles.deliveryChargePriceText}>₹{deliveryCharge}</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.rowContainer}>
        <View style={{ justifyContent: 'center', gap: 2 }}>
          <Text style={styles.toPayText}>To Pay</Text>
          <Text style={styles.inclTaxesText}>Incl. all taxes and charges</Text>
        </View>
        <View>
          <View style={styles.priceContainer}>
            <Text style={styles.cutOffPriceText}>
              ₹{cutOffPrice.toFixed(2)}
            </Text>
            <Text style={styles.currentPriceText}>₹{price.toFixed(2)}</Text>
          </View>
          <Center style={styles.savingBackground}>
            <Text style={styles.savingText}>SAVING ₹{savingPrice.toFixed(2)}</Text>
          </Center>
        </View>
      </View>
    </View>
  );
};

export default BillSummaryCard;
