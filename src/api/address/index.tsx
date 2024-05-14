import {APIClient} from '../axios.config';

export const addAddress = async address => {
  console.log(address);
  const headers = {
    Authorization: 'Bearer 42891370-e9e7-490d-a4c5-35d8eac7ee1d',
  };
  try {
    const response = await APIClient.post(
      'http://10.0.2.2:8801/v1/profile/address/add',
      address,
      {headers},
    );
    return response.data;
  } catch (error) {
    return error;
  }
};
