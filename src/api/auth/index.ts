import {APIClient} from '../axios.config';

// AUTH RELATED END-POINTS

// Send-OTP
export const sendOtp = async (phoneNo: string) => {
  try {
    const response = await APIClient.post('/send-otp', {phone: phoneNo});
    console.log("login api calles sucrssfully");
    return response.data;

  } catch (e: any) {
    console.log("login api calles not  sucrssfull");
    console.log(e);
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
