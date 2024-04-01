import NetInfo from '@react-native-community/netinfo';
const CheckForInternet = async () => {
  const response = await NetInfo.fetch();
  return response.isInternetReachable;
};

export default CheckForInternet;
