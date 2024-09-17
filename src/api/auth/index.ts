import {APIClient} from '../axios.config';
import { API } from '..';

// AUTH RELATED END-POINTS

// Send-OTP
export const sendOtp = async (phoneNo: string) => {
  try {
    const response = await APIClient.post(API.LOGIN, {phone: phoneNo});
    return response.data;
  } catch (e: any) {
    console.log(e);
  }
};

// Verify OTP
export const verifyOTP = async (OTPValue: string, phoneNo: string) => {
  try {
    const response = await APIClient.post(API.VERIFY_OTP, {
      phone: phoneNo,
      authCode: OTPValue,
    });
    return response.data;
  } catch (error: any) {
    console.log(error.message);
  }
};

// Signup
export const signUp = async (
  name: string,
  email: string,
  primaryPhoneNo: string,
  secondaryPhoneNo?: string,
) => {
  try {
    const response = await APIClient.post(API.SIGNUP, {
      name: name,
      email: email,
      primaryPhoneNo: primaryPhoneNo,
      secondaryPhoneNo: secondaryPhoneNo,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
