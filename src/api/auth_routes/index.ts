import {AuthAPIClient} from '../axios.config';

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
    return response.data.responseBody;
  } catch (error) {
    console.log(error);
  }
};
