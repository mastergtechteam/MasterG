import * as Sentry from '@sentry/react-native';
import { setVendorContext, clearVendorContext } from '../config/sentry';
import { setCrashlyticsUser, clearCrashlyticsUser, recordError } from '../config/crashlytics';
import { getCurrentScreen } from '../navigation/navigationRef';
import DeviceInfo from 'react-native-device-info';

// Actions that should NOT be reported (expected / handled flows)
const IGNORED_ACTIONS = new Set([]);

const sentryMiddleware = () => next => action => {
  const result = next(action);

  // Sync vendor context when retailer profile loads
  if (action.type === 'retailer/loadProfile/fulfilled') {
    const retailerId = action.payload?.retailerId;
    if (retailerId) {
      const appVersion = DeviceInfo.getVersion();
      setVendorContext(String(retailerId));
      setCrashlyticsUser(String(retailerId), appVersion);
    }
  }

  // Clear vendor context on logout / profile clear
  if (action.type === 'retailer/clearRetailerProfile') {
    clearVendorContext();
    clearCrashlyticsUser();
  }

  // Capture all rejected async thunks in both Sentry and Crashlytics
  if (action.type?.endsWith('/rejected') && !IGNORED_ACTIONS.has(action.type)) {
    const error = action.error ?? new Error(action.payload ?? action.type);
    const screen = getCurrentScreen();

    Sentry.captureException(error, {
      tags: {
        error_type: 'app_error',
        screen,
        redux_action: action.type,
      },
      extra: { payload: action.payload },
    });

    recordError(error, {
      error_type: 'app_error',
      screen,
      redux_action: action.type,
    });
  }

  return result;
};

export default sentryMiddleware;
