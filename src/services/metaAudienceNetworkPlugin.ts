
import { Capacitor } from '@capacitor/core';

interface MetaAudienceNetworkPlugin {
  initialize(options: { appId: string; testMode: boolean }): Promise<{ success: boolean }>;
  loadBanner(options: { placementId: string; position: 'top' | 'bottom' }): Promise<{ success: boolean }>;
  showBanner(options: { placementId: string; position: 'top' | 'bottom' }): Promise<{ success: boolean }>;
  hideBanner(): Promise<void>;
  loadInterstitial(options: { placementId: string }): Promise<{ success: boolean }>;
  showInterstitial(options: { placementId: string }): Promise<{ success: boolean }>;
}

// Mock implementation for web/development
const MetaAudienceNetworkWeb: MetaAudienceNetworkPlugin = {
  async initialize() {
    console.log('📱 Meta Audience Network Web Mock: Initialize');
    return { success: false };
  },
  async loadBanner() {
    console.log('📱 Meta Audience Network Web Mock: Load Banner');
    return { success: false };
  },
  async showBanner() {
    console.log('📱 Meta Audience Network Web Mock: Show Banner');
    return { success: false };
  },
  async hideBanner() {
    console.log('📱 Meta Audience Network Web Mock: Hide Banner');
  },
  async loadInterstitial() {
    console.log('📱 Meta Audience Network Web Mock: Load Interstitial');
    return { success: false };
  },
  async showInterstitial() {
    console.log('📱 Meta Audience Network Web Mock: Show Interstitial');
    return { success: false };
  }
};

export const MetaAudienceNetwork = Capacitor.isNativePlatform() 
  ? (window as any).MetaAudienceNetwork || MetaAudienceNetworkWeb
  : MetaAudienceNetworkWeb;
