import React, {FC} from 'react';
import {Image, Modal, Pressable, StyleSheet, View} from 'react-native';
import ProductsSpecialOverlay from '../ProductsSpecialOverlay';
import {horizontalScale, verticalScale} from '../../assets/scaling';
import ProductDetails from '../ProductDetails';

interface BottomSheetProps {
  visible: boolean;
  onClose: () => void;
  type: string;
  onPress: () => void;
}

const BottomSheet: FC<BottomSheetProps> = ({
  visible,
  onClose,
  type,
  onPress,
}) => {
  const getComponent = (type: string) => {
    switch (type) {
      case 'Product-Details':
        return <ProductDetails />;
      case 'Product-List':
        return <ProductsSpecialOverlay Close={onClose} onPress={onPress} />;
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
          style={{alignItems: 'center', marginVertical: 18}}
          onPress={onClose}>
          <Image
            style={{width: horizontalScale(44), height: verticalScale(40)}}
            source={require('../../assets/images/icons/close-button.png')}
          />
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
    height: '90%',
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
});
