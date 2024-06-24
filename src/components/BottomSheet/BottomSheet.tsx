import React, {FC} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import ProductsSpecialOverlay from '../ProductsSpecialOverlay';
import {verticalScale} from '../../assets/scaling';
import ProductDetails from '../ProductDetails';
import {SvgXml} from 'react-native-svg';
import {overlayCloseIcon} from '../../assets/images/icons/overlayClose';
import styles from './styles'; 

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  type: string;
  onPress?: (product: any) => void;
  productName?: string;
}

const BottomSheet: FC<BottomSheetProps> = ({
  visible,
  onClose,
  type,
  onPress,
  productName,
}) => {
  const getComponent = (type: string) => {
    switch (type) {
      case 'Product-Details':
        return <ProductDetails Close={onClose} productName={productName} />;
      case 'Product-List':
        return (
          <ProductsSpecialOverlay
            Close={onClose}
            onPress={selectedProduct => {
              onPress?.(selectedProduct);
            }}
          />
        );
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        {type === 'Product-Details' && (
          <Pressable
            style={{alignItems: 'center', marginVertical: verticalScale(10)}}
            onPress={onClose}>
            {/* <View style={styles.closeButton}> */}
            <SvgXml xml={overlayCloseIcon} width={50} height={50} />
            {/* </View> */}
          </Pressable>
        )}
        <View style={[styles.bottomSheet]}>{getComponent(type)}</View>
      </View>
    </Modal>
  );
};

export default BottomSheet;


