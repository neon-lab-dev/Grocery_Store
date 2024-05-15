import {AuthAPIClient} from '../axios.config';
import {getToken} from '../localstorage';

export const getAddress = async () => {
  const token = await getToken();

  if (token) {
    try {
      const response = await AuthAPIClient.get(
        'http://10.0.2.2:8801/v1/profile/address/fetch',
      );
      return response.data.responseBody.content;
    } catch (error) {
      return error;
    }
  } else
    try {
    } catch (error) {}
};

export const addAddress = async address => {
  console.log(address);
  const token = await getToken();

  if (token) {
    try {
      const response = await AuthAPIClient.post(
        'http://10.0.2.2:8801/v1/profile/address/add',
        address,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  } else
    try {
    } catch (error) {}
};

export const updateAddress = async address => {
  console.log('pressedd', address);
  const token = await getToken();

  if (token) {
    try {
      const response = await AuthAPIClient.post(
        'http://10.0.2.2:8801/v1/profile/address/update',
        address,
      );
      return response.data;
    } catch (error) {
      return error;
    }
  } else {
    try {
    } catch (error) {}
  }
};

export const deleteAddress = async id => {
  const deleteItem = [id];
  const token = await getToken();

  if (token) {
    try {
      //   console.log(deleteItem);
      const response = await AuthAPIClient.delete(
        'http://10.0.2.2:8801/v1/profile/address/delete',
        deleteItem,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }
};
