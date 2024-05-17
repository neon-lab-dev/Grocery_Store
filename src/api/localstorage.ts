import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (itemName: string, item: any) => {
  try {
    await AsyncStorage.setItem(itemName, JSON.stringify(item));
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

const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    const token = await getItem('token');
    return token;
  } catch (error) {
    console.log(error);
  }
};

const setPrimaryAddress = async (address: any) => {
  try {
    await setItem('primaryAddress', address);
    console.log('success saving primary address');
  } catch (error) {
    console.log(error);
  }
};

const getPrimaryAddress = async () => {
  try {
    const primaryAddress = await getItem('primaryAddress');
    console.log('primay', primaryAddress);
    return primaryAddress;
  } catch (error) {
    console.log(error);
  }
};

export {
  setItem,
  getItem,
  removeItem,
  getToken,
  clear,
  setPrimaryAddress,
  getPrimaryAddress,
};
