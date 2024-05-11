import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (itemName: string, item: any) => {
  try {
    await AsyncStorage.setItem(itemName, item);
  } catch (error) {
    console.log(error);
  }
};

const getItem = async (itemName: string) => {
  try {
    return await AsyncStorage.getItem(itemName);
  } catch (error) {
    console.log(error);
  }
};

const removeItem = async (itemName: string) => {
  try {
    await AsyncStorage.removeItem(itemName);
  } catch (error) {
    console.log(error);
  }
};

export {setItem, getItem, removeItem};
