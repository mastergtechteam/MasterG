import { Platform, PermissionsAndroid } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'android') {
    if (Platform.Version >= 33) {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      return result === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  }

  const authStatus = await messaging().requestPermission();
  return (
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL
  );
}

export async function getFCMToken(): Promise<string | null> {
  try {
    const token = await messaging().getToken();
    console.log('[FCM] Token:', token);
    return token;
  } catch (e) {
    console.warn('[FCM] Failed to get token:', e);
    return null;
  }
}

export function setupNotificationListeners() {
  const unsubscribe = messaging().onMessage(async remoteMessage => {
    console.log('[FCM] Foreground message:', remoteMessage);
    // TODO: Show in-app notification UI
  });

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log('[FCM] Opened from background:', remoteMessage);
    // TODO: Navigate based on remoteMessage.data
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log('[FCM] Opened from quit state:', remoteMessage);
        // TODO: Navigate based on remoteMessage.data
      }
    });

  return unsubscribe;
}

// Must be called outside any component (at root index.js)
export function registerBackgroundHandler() {
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('[FCM] Background message:', remoteMessage);
  });
}
