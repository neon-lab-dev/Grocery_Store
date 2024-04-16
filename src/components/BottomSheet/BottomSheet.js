import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ProductsSpecialOverlay from '../ProductsSpecialOverlay';
import {horizontalScale, verticalScale} from '../../assets/scaling';

const BottomSheet = ({visible, onClose}) => {
  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="slide"
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
        <View style={[styles.bottomSheet]}>
          {/* Bottom Wraper */}
          <ProductsSpecialOverlay Close={onClose} />
          {/* Bottom Wraper */}
        </View>
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
