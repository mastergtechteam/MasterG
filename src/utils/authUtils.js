import * as Keychain from 'react-native-keychain';

export const getAuthData = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (!credentials) return null;
  return JSON.parse(credentials.password);
};
