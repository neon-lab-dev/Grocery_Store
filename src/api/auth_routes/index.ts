import {AuthAPIClient, AuthAPIClient2} from '../axios.config';

export const searchProduct = async (
  searchInp: string,
  sortBy: string,
  minValue: number,
  maxValue: number,
  selectedBrand: string,
) => {
  try {
    let url = '/product/list';
    let queryParams = [];

    if (searchInp) {
      queryParams.push(`name=${searchInp}`);
    }
    if (sortBy) {
      if (sortBy === 'lowtohigh') {
        queryParams.push('sortBy=price&sortDirection=ASC');
      } else if (sortBy === 'hightolow') {
        queryParams.push('sortBy=price&sortDirection=DESC');
      }
    }
    if (minValue) {
      queryParams.push(`minimumPrice=${minValue}`);
    }
    if (maxValue) {
      queryParams.push(`maximumPrice=${maxValue}`);
    }
    if (selectedBrand) {
      queryParams.push(`brand=${selectedBrand}`);
    }

    if (queryParams.length > 0) {
      url += `?${queryParams.join('&')}`;
    }

    const response = await AuthAPIClient.get(url);
    console.log('response-rr', response);
    return response.data.responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const getAddress = async () => {
  try {
    const response = await AuthAPIClient2.get('/profile/address/fetch');
    console.log('getaddress', response);
    return response.data.responseBody.content;
  } catch (error) {
    return error;
  }
};

// export const getAddress = async () => {
//   const url = '/profile/address/fetch';

//   try {
//     const response = await AuthAPIClient2.get(url);
//     return response;
//   } catch (error) {
//     console.log(error);
//     // if (error.response) {
//     //   // The request was made and the server responded with a status code
//     //   // that falls out of the range of 2xx
//     //   console.error('Error data:', error.response.data);
//     //   console.error('Error status:', error.response.status);
//     //   console.
//   }
// };

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

export const getOrders = async () => {
  try {
    const response = await AuthAPIClient.get('/order/list');
    console.log('response-orders', response);
  } catch (error) {
    console.log(error);
  }
};
