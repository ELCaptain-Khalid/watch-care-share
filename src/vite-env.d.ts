
/// <reference types="vite/client" />

// Capacitor interface for window object
interface Window {
  Capacitor?: {
    isNative: boolean;
    getPlatform: () => string;
  };
}
