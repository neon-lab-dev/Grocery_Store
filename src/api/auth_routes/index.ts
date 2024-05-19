import {AuthAPIClient, AuthAPIClient2} from '../axios.config';

export const getProducts = async () => {
  try {
    const response = await AuthAPIClient.get('/product/list');
    return response.data.responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const searchProduct = async (
  searchInp: string,
  sortBy?: string,
  minValue?: number,
  maxValue?: number,
  selectedBrand?: string,
) => {
  try {
    let url = '/product/list';
    let queryParams = [];

    if (searchInp) {
      queryParams.push(`name=${searchInp}`);
    }
    if (sortBy) {
      if (sortBy === 'lowtohigh') {
        queryParams.push('sortByVarietyfield=price&sortDirection=ASC');
      } else if (sortBy === 'hightolow') {
        queryParams.push('sortByVarietyfield=price&sortDirection=DESC');
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
    return response.data.responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const fetchUserData = async () => {
  try {
    const response = await AuthAPIClient2.get('/profile/user/fetch');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserData = async (updatedFields: {}) => {
  try {
    const response = await AuthAPIClient2.put(
      '/profile/user/update',
      updatedFields,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
