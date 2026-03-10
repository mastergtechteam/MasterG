import DeviceInfo from 'react-native-device-info';

export const getAppType = () => {
  const bundleId = DeviceInfo.getBundleId();

  if (bundleId === 'com.masterg.retail.pro.ai') {
    return 'pro';
  }

  return 'limited';
};
