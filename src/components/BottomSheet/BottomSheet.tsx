import React, {FC} from 'react';
import {Modal, Pressable, StyleSheet, View} from 'react-native';
import ProductsSpecialOverlay from '../ProductsSpecialOverlay';
import {verticalScale} from '../../assets/scaling';
import ProductDetails from '../ProductDetails';
import {SvgXml} from 'react-native-svg';
import {overlayCloseIcon} from '../../assets/images/icons/overlayClose';

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
        <Pressable
          style={{alignItems: 'center', marginVertical: verticalScale(10)}}
          onPress={onClose}>
          <View style={styles.closeButton}>
            <SvgXml xml={overlayCloseIcon} />
          </View>
        </Pressable>
        <View style={[styles.bottomSheet]}>{getComponent(type)}</View>
      </View>
    </Modal>
  );
};

export default BottomSheet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    height: '87%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  closeButton: {
    width: 64,
    height: 64,
    backgroundColor: '#03071280',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 32,
  },
});
