import { createRef } from 'react';

export const navigationRef = createRef();

export const getCurrentScreen = () =>
  navigationRef.current?.getCurrentRoute()?.name ?? 'Unknown';
