
import { AdMob, BannerAdOptions, BannerAdPosition, BannerAdSize, InterstitialAdPluginEvents, AdLoadInfo, AdOptions, RewardAdPluginEvents, AdMobRewardItem } from '@capacitor-community/admob';

// Test ad unit IDs - replace with your actual IDs in production
const TEST_BANNER_AD_ID = {
  ios: 'ca-app-pub-3940256099942544/2934735716',
  android: 'ca-app-pub-3940256099942544/6300978111'
};

const TEST_INTERSTITIAL_AD_ID = {
  ios: 'ca-app-pub-3940256099942544/4411468910',
  android: 'ca-app-pub-3940256099942544/1033173712'
};

const TEST_REWARDED_AD_ID = {
  ios: 'ca-app-pub-3940256099942544/1712485313',
  android: 'ca-app-pub-3940256099942544/5224354917'
};

class AdMobService {
  private isInitialized = false;
  private listeners: Array<{ remove: () => void }> = [];

  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      // Only initialize if we're in a Capacitor environment
      if (window.Capacitor) {
        await AdMob.initialize();
        this.isInitialized = true;
        console.log('AdMob initialized successfully');
      } else {
        console.log('AdMob initialization skipped - not in a Capacitor environment');
      }
    } catch (error) {
      console.error('Error initializing AdMob:', error);
    }
  }

  async showBanner() {
    if (!window.Capacitor) {
      console.log('Banner ad skipped - not in a Capacitor environment');
      return;
    }
    
    if (!this.isInitialized) await this.initialize();

    const options: BannerAdOptions = {
      adId: this.getPlatformAdId(TEST_BANNER_AD_ID),
      adSize: BannerAdSize.ADAPTIVE_BANNER,
      position: BannerAdPosition.BOTTOM_CENTER,
      margin: 0,
      isTesting: true // Set to false in production
    };

    try {
      await AdMob.showBanner(options);
      console.log('Banner ad shown successfully');
    } catch (error) {
      console.error('Error showing banner ad:', error);
    }
  }

  async hideBanner() {
    if (!window.Capacitor) return;
    
    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden successfully');
    } catch (error) {
      console.error('Error hiding banner ad:', error);
    }
  }

  async showInterstitial(onDismiss?: () => void) {
    if (!window.Capacitor) {
      console.log('Interstitial ad skipped - not in a Capacitor environment');
      if (onDismiss) setTimeout(onDismiss, 1000);
      return;
    }
    
    if (!this.isInitialized) await this.initialize();

    const options: AdOptions = {
      adId: this.getPlatformAdId(TEST_INTERSTITIAL_AD_ID),
      isTesting: true // Set to false in production
    };

    try {
      // Clean up any previous listeners
      this.removeAllListeners();
      
      // Listen for the ad to be dismissed
      const dismissListener = await AdMob.addListener(
        InterstitialAdPluginEvents.Dismissed, 
        () => {
          console.log('Interstitial ad dismissed');
          if (onDismiss) onDismiss();
          // Remove listener after use
          dismissListener.remove();
        }
      );
      
      this.listeners.push(dismissListener);

      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown successfully');
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      this.removeAllListeners();
      if (onDismiss) onDismiss();
    }
  }

  async showRewardedAd(onReward?: (reward: AdMobRewardItem) => void, onDismiss?: () => void) {
    if (!window.Capacitor) {
      console.log('Rewarded ad skipped - not in a Capacitor environment');
      // Simulate reward after a delay in web environment
      setTimeout(() => {
        if (onReward) onReward({ type: 'coins', amount: 10 });
        if (onDismiss) setTimeout(onDismiss, 500);
      }, 2000);
      return;
    }
    
    if (!this.isInitialized) await this.initialize();

    const options: AdOptions = {
      adId: this.getPlatformAdId(TEST_REWARDED_AD_ID),
      isTesting: true // Set to false in production
    };

    try {
      // Clean up any previous listeners
      this.removeAllListeners();
      
      // Listen for reward
      const rewardListener = await AdMob.addListener(
        RewardAdPluginEvents.Rewarded, 
        (info: AdMobRewardItem) => {
          console.log('Rewarded ad reward received:', info);
          if (onReward) onReward(info);
        }
      );
      
      // Listen for dismissal
      const dismissListener = await AdMob.addListener(
        RewardAdPluginEvents.Dismissed, 
        () => {
          console.log('Rewarded ad dismissed');
          if (onDismiss) onDismiss();
          // Remove listeners after use
          this.removeAllListeners();
        }
      );
      
      this.listeners.push(rewardListener, dismissListener);

      await AdMob.prepareRewardVideoAd(options);
      await AdMob.showRewardVideoAd();
      console.log('Rewarded ad shown successfully');
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      this.removeAllListeners();
      if (onDismiss) onDismiss();
    }
  }

  private removeAllListeners() {
    // Remove all active listeners
    for (const listener of this.listeners) {
      listener.remove();
    }
    this.listeners = [];
  }

  private getPlatformAdId(adIds: { ios: string; android: string }): string {
    const platform = this.getPlatform();
    return platform === 'ios' ? adIds.ios : adIds.android;
  }

  private getPlatform(): 'ios' | 'android' {
    if (navigator.userAgent.includes('iPhone') || navigator.userAgent.includes('iPad')) {
      return 'ios';
    }
    return 'android';
  }
}

// Add Window capacitor type for TypeScript
declare global {
  interface Window {
    Capacitor?: any;
  }
}

export const adMobService = new AdMobService();
