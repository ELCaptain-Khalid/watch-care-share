
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

  constructor() {
    this.initialize();
  }

  async initialize() {
    try {
      await AdMob.initialize();
      this.isInitialized = true;
      console.log('AdMob initialized successfully');
    } catch (error) {
      console.error('Error initializing AdMob:', error);
    }
  }

  async showBanner() {
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
    try {
      await AdMob.hideBanner();
      console.log('Banner ad hidden successfully');
    } catch (error) {
      console.error('Error hiding banner ad:', error);
    }
  }

  async showInterstitial(onDismiss?: () => void) {
    if (!this.isInitialized) await this.initialize();

    const options: AdOptions = {
      adId: this.getPlatformAdId(TEST_INTERSTITIAL_AD_ID),
      isTesting: true // Set to false in production
    };

    try {
      // Listen for the ad to be dismissed
      const dismissListener = AdMob.addListener(InterstitialAdPluginEvents.Dismissed, () => {
        console.log('Interstitial ad dismissed');
        if (onDismiss) onDismiss();
        // Remove listener after use
        dismissListener.remove();
      });

      await AdMob.prepareInterstitial(options);
      await AdMob.showInterstitial();
      console.log('Interstitial ad shown successfully');
    } catch (error) {
      console.error('Error showing interstitial ad:', error);
      // No need to call removeAllListeners since we use the remove() method on individual listeners
    }
  }

  async showRewardedAd(onReward?: (reward: AdMobRewardItem) => void, onDismiss?: () => void) {
    if (!this.isInitialized) await this.initialize();

    const options: AdOptions = {
      adId: this.getPlatformAdId(TEST_REWARDED_AD_ID),
      isTesting: true // Set to false in production
    };

    try {
      // Listen for reward
      const rewardListener = AdMob.addListener(RewardAdPluginEvents.Rewarded, (info: AdMobRewardItem) => {
        console.log('Rewarded ad reward received:', info);
        if (onReward) onReward(info);
      });

      // Listen for dismissal
      const dismissListener = AdMob.addListener(RewardAdPluginEvents.Dismissed, () => {
        console.log('Rewarded ad dismissed');
        if (onDismiss) onDismiss();
        // Remove listeners after use
        rewardListener.remove();
        dismissListener.remove();
      });

      await AdMob.prepareRewardVideoAd(options);
      await AdMob.showRewardVideoAd();
      console.log('Rewarded ad shown successfully');
    } catch (error) {
      console.error('Error showing rewarded ad:', error);
      // No need to call removeAllListeners since we use the remove() method on individual listeners
    }
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

export const adMobService = new AdMobService();
