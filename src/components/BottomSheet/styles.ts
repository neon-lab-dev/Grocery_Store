import { StyleSheet } from 'react-native';

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
      width: 20,
      height: 20,
      backgroundColor: '#03071280',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 32,
    },
  });
  