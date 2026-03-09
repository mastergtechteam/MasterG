/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { initSentry } from './src/config/sentry';
import * as Sentry from '@sentry/react-native';
import { registerBackgroundHandler } from './src/config/notifications';

initSentry();
registerBackgroundHandler();

AppRegistry.registerComponent(appName, () => Sentry.wrap(App));
