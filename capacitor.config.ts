
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.3cadeda397044ef8af1081c9448557ab',
  appName: 'watch-care-share',
  webDir: 'dist',
  server: {
    url: 'https://3cadeda3-9704-4ef8-af10-81c9448557ab.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    AdMob: {
      appId: {
        ios: 'ca-app-pub-3940256099942544~1458002511',  // Test App ID
        android: 'ca-app-pub-3940256099942544~3347511713'  // Test App ID
      }
    }
  }
};

export default config;
