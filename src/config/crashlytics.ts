import {
  getCrashlytics,
  setCrashlyticsCollectionEnabled,
  setUserId,
  setAttributes,
  log,
  recordError as firebaseRecordError,
} from '@react-native-firebase/crashlytics';

export function initCrashlytics() {
  try {
    setCrashlyticsCollectionEnabled(getCrashlytics(), true);
  } catch (e) {
    console.warn('[Crashlytics] initCrashlytics failed:', e);
  }
}

export async function setCrashlyticsUser(retailerId: string, appVersion: string) {
  try {
    await setUserId(getCrashlytics(), String(retailerId));
    await setAttributes(getCrashlytics(), { vendor_id: String(retailerId), app_version: appVersion });
  } catch (e) {
    console.warn('[Crashlytics] setCrashlyticsUser failed:', e);
  }
}

export async function clearCrashlyticsUser() {
  try {
    await setUserId(getCrashlytics(), '');
    await setAttributes(getCrashlytics(), { vendor_id: '', app_version: '' });
  } catch (e) {
    console.warn('[Crashlytics] clearCrashlyticsUser failed:', e);
  }
}

export function recordError(error: Error, context?: Record<string, string>) {
  try {
    if (context) {
      log(getCrashlytics(), JSON.stringify(context));
    }
    firebaseRecordError(getCrashlytics(), error);
  } catch (e) {
    console.warn('[Crashlytics] recordError failed:', e);
  }
}
