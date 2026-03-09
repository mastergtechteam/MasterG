/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initSentry } from './src/config/sentry';
import { initCrashlytics } from './src/config/crashlytics';
import * as Sentry from '@sentry/react-native';

initSentry();
initCrashlytics();

AppRegistry.registerComponent(appName, () => Sentry.wrap(App));
