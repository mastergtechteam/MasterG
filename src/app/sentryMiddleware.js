import * as Sentry from '@sentry/react-native';
import { setVendorContext, clearVendorContext } from '../config/sentry';
import { getCurrentScreen } from '../navigation/navigationRef';

// Actions that should NOT be reported to Sentry (expected / handled flows)
const IGNORED_ACTIONS = new Set([]);

const sentryMiddleware = () => next => action => {
  const result = next(action);

  // Sync vendor context when retailer profile loads
  if (action.type === 'retailer/loadProfile/fulfilled') {
    const retailerId = action.payload?.retailerId;
    if (retailerId) {
      setVendorContext(String(retailerId));
    }
  }

  // Clear vendor context on logout / profile clear
  if (action.type === 'retailer/clearRetailerProfile') {
    clearVendorContext();
  }

  // Capture all rejected async thunks
  if (action.type?.endsWith('/rejected') && !IGNORED_ACTIONS.has(action.type)) {
    const error = action.error ?? new Error(action.payload ?? action.type);
    Sentry.captureException(error, {
      tags: {
        error_type: 'app_error',
        screen: getCurrentScreen(),
        redux_action: action.type,
      },
      extra: {
        payload: action.payload,
      },
    });
  }

  return result;
};

export default sentryMiddleware;
