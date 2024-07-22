import {AuthAPIClient, AuthAPIClient2} from '../axios.config';
import { API } from '..';

export const getProducts = async (NumberOfProducts: Number) => {
  try {
    const response = await AuthAPIClient.get(
      `${API.GET_PRODUCTS}?perPage=${NumberOfProducts}`,
    );
    return response.data.responseBody;
  } catch (error) {
    console.log(error);
  }
};

export const searchProduct = async (
  code?: string,
  searchInp?: string,
  sortBy?: string,
  minValue?: number,
  maxValue?: number,
  selectedBrand?: string,
  pageNo?: number,
  NumberOfProducts?: Number,
) => {
  try {
    let url = API.GET_PRODUCTS;
    let queryParams = [];
    if (NumberOfProducts) {
      queryParams.push(`perPage=${NumberOfProducts}`);
    }
    if (pageNo) {
      queryParams.push(`pageNo=${pageNo}`);
    }
    if (searchInp) {
      queryParams.push(`name=${searchInp}`);
    }
    if (code) {
      queryParams.push(`codes=${code}`);
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
    const response = await AuthAPIClient2.get(API.FETCH_USER_DATA);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const updateUserData = async (updatedFields: {}) => {
  try {
    const response = await AuthAPIClient2.put(
      API.UPDATE_USER_DATA,
      updatedFields,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getAddress = async () => {
  try {
    const response = await AuthAPIClient2.get(API.GET_ADDRESS);
    // console.log('getaddress', response);
    return response.data.responseBody.content;
  } catch (error) {
    return error;
  }
};

export const addAddress = async address => {
  console.log('addAdress', address);
  try {
    const response = await AuthAPIClient2.post(API.ADD_ADDRESS, address);
    // console.log('Addaddress', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateAddress = async address => {
  try {
    const response = await AuthAPIClient2.post(
      API.UPDATE_ADDRESS,
      address,
    );
    // console.log('updateddress', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const deleteAddress = async id => {
  try {
    const response = await AuthAPIClient2.delete(API.DELETE_ADDRESS, {
      data: [id],
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const createSuggestion = async comment => {
  // console.log(comment);
  try {
    const response = await AuthAPIClient.post(API.CREATE_SUGGESTION, {
      comment: comment,
    });
    return response.data;
  } catch (error) {
    return error;
  }
};

export const getOrders = async () => {
  try {
    const response = await AuthAPIClient.get(API.GET_ORDER);
    return response.data.responseBody.content;
  } catch (error) {
    console.log(error);
  }
};
export const CreateOrders = async (orderData: {paymentId: string}) => {
  try {
    const response = await AuthAPIClient.post(API.CREATE_ORDER, orderData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const fetchpayment = async (TotalPrice: any, dis: string) => {
  try {
    const response = await AuthAPIClient.get(
      `${API.FETCH_PAYMENT}=${TotalPrice}&description=${dis}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const paymentStatus = async (PaymentID: string) => {
  try {
    const response = await AuthAPIClient.get(
      `${API.PAYMENT_STATUS}=${PaymentID}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const ForcepaymentStatus = async (PaymentID: string) => {
  try {
    const response = await AuthAPIClient.get(
      `${API.PAYMENT_STATUS}=${PaymentID}&external=true`,
    );
    return response.data.responseBody.paymentStatus;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCategory = async () => {
  try {
    const response = await AuthAPIClient.get(API.FETCH_ALL_CATEGORY);
    if (response.data && response.data.responseBody) {
      // console.log(response.data.responseBody);
      return response.data.responseBody;
    }
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const evaluateOrder = async orderData => {
  try {
    const response = await AuthAPIClient.post(API.EVALUATE_ORDERS, {
      boughtProductDetailsList: orderData,
    });
    return response.data.responseBody;
  } catch (error) {
    console.log(error);
  }
};
