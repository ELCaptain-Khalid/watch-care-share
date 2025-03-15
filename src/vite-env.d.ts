
/// <reference types="vite/client" />

// Capacitor interface for window object
interface Window {
  Capacitor?: any; // Using 'any' type to avoid conflict with the existing declaration
}
