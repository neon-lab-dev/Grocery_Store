import {useDispatch} from 'react-redux';
import {APIClient} from '../axios.config';
import {logout} from '../../redux/slices/auth.slice';
import {useNavigation} from '@react-navigation/native';

export const addAddress = async address => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

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
    // if (error === 'AxiosError: Request failed with status code 403') {
    //   dispatch(logout());
    //   navigation.replace('Auth', {screen: 'Login'});
    // }
    return error;
  }
};
