import * as Sentry from '@sentry/react-native';
import DeviceInfo from 'react-native-device-info';

const APP_VERSION = DeviceInfo.getVersion();

export const routingInstrumentation = Sentry.reactNavigationIntegration();

export function initSentry() {
  Sentry.init({
    dsn: 'https://b2c9be25aa56b7f1c27e05cfb017a6bf@o4510425097502720.ingest.us.sentry.io/4510996962476032',
    integrations: [routingInstrumentation],
    tracesSampleRate: 1.0,
    debug: false,
    release: APP_VERSION,
  });
}

export function setVendorContext(retailerId: string) {
  Sentry.setUser({ id: retailerId });
  Sentry.setTag('vendor_id', retailerId);
  Sentry.setTag('app_version', APP_VERSION);
}

export function clearVendorContext() {
  Sentry.setUser(null);
}
