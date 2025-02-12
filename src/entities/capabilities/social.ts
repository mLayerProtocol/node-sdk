export class SocialMediaCapabilities {
  supportedPlatforms: string[];
  actions: {
    read: boolean;
    post: boolean;
    delete: boolean;
    schedule: boolean;
    analyze: boolean;
  };
  contentTypes: string[];
  schedulingFeatures: boolean;
  analyticsFeatures: boolean;
  interactionManagement: {
    replyAutomation: boolean;
    moderationSupport: boolean;
    sentimentAnalysis: boolean;
  };

  toPayload(): Record<string, any> {
    return {
      supportedPlatforms: this.supportedPlatforms,
      actions: this.actions,
      contentTypes: this.contentTypes,
      schedulingFeatures: this.schedulingFeatures,
      analyticsFeatures: this.analyticsFeatures,
      interactionManagement: this.interactionManagement,
    };
  }

  static fromPayload(payload: any): SocialMediaCapabilities {
    const capabilities = new SocialMediaCapabilities();
    capabilities.supportedPlatforms = payload.supportedPlatforms;
    capabilities.actions = payload.actions;
    capabilities.contentTypes = payload.contentTypes;
    capabilities.schedulingFeatures = payload.schedulingFeatures;
    capabilities.analyticsFeatures = payload.analyticsFeatures;
    capabilities.interactionManagement = payload.interactionManagement;
    return capabilities;
  }
}
