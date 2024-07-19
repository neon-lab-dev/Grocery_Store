import {AuthAPIClient, AuthAPIClient2} from '../axios.config';

export const getProducts = async (NumberOfProducts: Number) => {
  try {
    const response = await AuthAPIClient.get(
      `/product/list?perPage=${NumberOfProducts}`,
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
    let url = '/product/list';
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

export const getAddress = async () => {
  try {
    const response = await AuthAPIClient2.get('/profile/address/fetch');
    // console.log('getaddress', response);
    return response.data.responseBody.content;
  } catch (error) {
    return error;
  }
};

export const addAddress = async address => {
  console.log('addAdress', address);
  try {
    const response = await AuthAPIClient2.post('/profile/address/add', address);
    // console.log('Addaddress', response);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const updateAddress = async address => {
  try {
    const response = await AuthAPIClient2.post(
      '/profile/address/update',
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
    const response = await AuthAPIClient2.delete('/profile/address/delete', {
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
    return response.data.responseBody.content;
  } catch (error) {
    console.log(error);
  }
};
export const CreateOrders = async (orderData: {paymentId: string}) => {
  try {
    const response = await AuthAPIClient.post('/order/create', orderData);
    return response;
  } catch (error) {
    console.log(error);
  }
};
export const fetchpayment = async (TotalPrice: any, dis: string) => {
  try {
    const response = await AuthAPIClient.get(
      `/payment/get/payment-link?amount=${TotalPrice}&description=${dis}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const paymentStatus = async (PaymentID: string) => {
  try {
    const response = await AuthAPIClient.get(
      `/payment/status?paymentId=${PaymentID}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
export const ForcepaymentStatus = async (PaymentID: string) => {
  try {
    const response = await AuthAPIClient.get(
      `/payment/status?paymentId=${PaymentID}&external=true`,
    );
    return response.data.responseBody.paymentStatus;
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllCategory = async () => {
  try {
    const response = await AuthAPIClient.get('/category/all');
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
    const response = await AuthAPIClient.post('/order/evaluate', {
      boughtProductDetailsList: orderData,
    });
    return response.data.responseBody;
  } catch (error) {
    console.log(error);
  }
};
