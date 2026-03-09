import * as Sentry from '@sentry/react-native';
import { recordError } from '../config/crashlytics';
import { getCurrentScreen } from '../navigation/navigationRef';

export const BASE_URL = 'https://uqlzs7e7wj.execute-api.ap-south-1.amazonaws.com';
const TAG = '[API]';

export const apiGet = async (endpoint, params = {}) => {
  const query = new URLSearchParams(params).toString();
  const url = query
    ? `${BASE_URL}${endpoint}?${query}`
    : `${BASE_URL}${endpoint}`;

  console.log(TAG, `▶ GET ${url}`);
  const start = Date.now();

  try {
    const response = await fetch(url);
    const duration = Date.now() - start;
    console.log(TAG, `GET ${endpoint} — ${duration}ms | status: ${response.status}`);

    if (!response.ok) {
      console.warn(TAG, `❌ GET ${endpoint} failed — status: ${response.status}`);
      const error = new Error(`API request failed: ${response.status}`);
      const screen = getCurrentScreen();
      const context = {
        error_type: 'api_error',
        screen,
        method: 'GET',
        endpoint,
        status_code: String(response.status),
        duration_ms: String(duration),
      };

      Sentry.captureException(error, {
        tags: { error_type: 'api_error', screen },
        contexts: { api: { method: 'GET', endpoint, status_code: response.status, duration_ms: duration } },
      });
      recordError(error, context);
      throw error;
    }

    const data = await response.json();
    console.log(TAG, `✅ GET ${endpoint} — response:`, JSON.stringify(data, null, 2));
    return data;
  } catch (error) {
    const duration = Date.now() - start;
    console.error(TAG, `❌ GET ${endpoint} — error: ${error.message}`);

    // Only capture network/parse errors (HTTP errors already captured above)
    if (!error.message.startsWith('API request failed')) {
      const screen = getCurrentScreen();
      const context = {
        error_type: 'api_error',
        screen,
        method: 'GET',
        endpoint,
        duration_ms: String(duration),
      };

      Sentry.captureException(error, {
        tags: { error_type: 'api_error', screen },
        contexts: { api: { method: 'GET', endpoint, duration_ms: duration } },
      });
      recordError(error, context);
    }

    throw error;
  }
};
