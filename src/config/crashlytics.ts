import {
  getCrashlytics,
  setCrashlyticsCollectionEnabled,
  setUserId,
  setAttributes,
  log,
  recordError as firebaseRecordError,
  crash,
} from '@react-native-firebase/crashlytics';

const instance = getCrashlytics();

export function initCrashlytics() {
  setCrashlyticsCollectionEnabled(instance, true);
}

export async function setCrashlyticsUser(retailerId: string, appVersion: string) {
  await setUserId(instance, String(retailerId));
  await setAttributes(instance, { vendor_id: String(retailerId), app_version: appVersion });
}

export async function clearCrashlyticsUser() {
  await setUserId(instance, '');
  await setAttributes(instance, { vendor_id: '', app_version: '' });
}

export function recordError(error: Error, context?: Record<string, string>) {
  if (context) {
    log(instance, JSON.stringify(context));
  }
  firebaseRecordError(instance, error);
}
