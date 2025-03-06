
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
    // We'll add AdMob configuration here in the future
  }
};

export default config;
