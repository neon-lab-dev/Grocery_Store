import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, data: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Set Item Error', e);
  }
};

const getItem = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error('Get Item Error', e);
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key, () => {
      console.log('Item emoved');
    });
  } catch (e) {
    console.error('Remove Item Error', e);
  }
};

export default {setItem, getItem, removeItem};
