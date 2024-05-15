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

const storeAddress = async value => {
  try {
    await AsyncStorage.setItem(
      'primaryAddress',
      JSON.stringify({
        landmark: 'NNR Appartment',
        address: '5-13',
        city: 'Vijayawada',
        state: 'AndhraPradesh',
        pincode: '521325',
        label: 'Home',
      }),
    );
  } catch (error) {
    console.log('yess', error);
  }
};

const getToken = async () => {
  try {
    const token = await getItem('token');
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
};

export {setItem, getItem, removeItem, storeAddress, getToken};
