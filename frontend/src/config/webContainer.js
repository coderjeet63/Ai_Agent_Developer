import { WebContainer } from '@webcontainer/api';

let webContainerInstance = null;

export const getWebContainer = async () => {
  if (
    typeof window === 'undefined' ||
    !window.crossOriginIsolated || // Required by WebContainer
    location.hostname !== 'localhost' // Avoid running on deployed domain
  ) {
    console.warn('WebContainer not supported in this environment');
    return null;
  }

  if (webContainerInstance === null) {
    webContainerInstance = await WebContainer.boot();
  }
  return webContainerInstance;
};
