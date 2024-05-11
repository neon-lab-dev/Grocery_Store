import {toast} from '../../components/Toast/Toast';
import {APIClient} from '../axios.config';

// AUTH RELATED END-POINTS

// Send-OTP
export const sendOtp = async (phoneNo: string) => {
  try {
    const response = await APIClient.post('/send-otp', {phone: phoneNo});
    return response.data;
  } catch (e: any) {
    toast.showToast(e.message);
  }
};

// Verify OTP
export const verifyOTP = async (OTPValue: string, phoneNo: string) => {
  try {
    const response = await APIClient.post('/verify-otp', {
      phone: phoneNo,
      authCode: OTPValue,
    });
    return response.data;
  } catch (error: any) {
    toast.showToast(error.message);
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
    const response = await APIClient.post('/signup', {
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
