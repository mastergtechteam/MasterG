import * as Keychain from 'react-native-keychain';

const SERVICE_NAME = 'retailer-auth';

// Save token + retailerId securely
export const saveAuthData = async (token, retailerId) => {
  await Keychain.setGenericPassword(
    'auth',
    JSON.stringify({ token, retailerId }),
    { service: SERVICE_NAME },
  );
};

// Get token + retailerId
export const getAuthData = async () => {
  const credentials = await Keychain.getGenericPassword({
    service: SERVICE_NAME,
  });

  if (credentials) {
    return JSON.parse(credentials.password);
  }

  return null;
};

// Clear secure data (logout)
export const clearAuthData = async () => {
  await Keychain.resetGenericPassword({
    service: SERVICE_NAME,
  });
};
