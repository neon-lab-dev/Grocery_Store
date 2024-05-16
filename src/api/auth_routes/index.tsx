import {AuthAPIClient, AuthAPIClient2} from '../axios.config';
import {getToken} from '../localstorage';

export const getAddress = async () => {
  try {
    const response = await AuthAPIClient2.get('/profile/address/fetch');
    console.log('getaddress', response);
    return response.data.responseBody.content;
  } catch (error) {
    return error;
  }
};

export const addAddress = async address => {
  console.log(address);
  try {
    const response = await AuthAPIClient2.post('/profile/address/add', {
      address,
    });
    console.log('Addaddress', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateAddress = async address => {
  console.log('edited', address);
  try {
    const response = await AuthAPIClient2.post(
      '/profile/address/update',
      address,
    );
    console.log('updateddress', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteAddress = async id => {
  console.log(id);
  try {
    const response = await AuthAPIClient2.delete('/profile/address/delete', [
      id,
    ]);
    console.log('deleteAddress', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createSuggestion = async comment => {
  console.log(comment);
  try {
    const response = await AuthAPIClient.post('/suggestion/create', {
      comment: comment,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};
