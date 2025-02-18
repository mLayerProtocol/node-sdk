import { AudioProcessingCapabilities } from './capabilities/audio';
import { AutomationCapabilities } from './capabilities/automation';
import { CryptoTradingCapabilities } from './capabilities/crypto';
import { DataAnalyticsCapabilities } from './capabilities/data';
import { NLPCapabilities } from './capabilities/nlp';
import { SecurityMonitoringCapabilities } from './capabilities/security';
import { SocialMediaCapabilities } from './capabilities/social';
import { ComputerVisionCapabilities } from './capabilities/vision';

// export class ServiceCapabilities {
//   nlp?: NLPCapabilities;
//   computerVision?: ComputerVisionCapabilities;
//   audioProcessing?: AudioProcessingCapabilities;
//   cryptoTrading?: CryptoTradingCapabilities;
//   dataAnalytics?: DataAnalyticsCapabilities;
//   socialMedia?: SocialMediaCapabilities;
//   automation?: AutomationCapabilities;
//   securityMonitoring?: SecurityMonitoringCapabilities;

//   toPayload(): Record<string, any> {
//     return {
//       nlp: this.nlp?.toPayload(),
//       computerVision: this.computerVision?.toPayload(),
//       audioProcessing: this.audioProcessing?.toPayload(),
//       cryptoTrading: this.cryptoTrading?.toPayload(),
//       dataAnalytics: this.dataAnalytics?.toPayload(),
//       socialMedia: this.socialMedia?.toPayload(),
//       automation: this.automation?.toPayload(),
//       securityMonitoring: this.securityMonitoring?.toPayload(),
//     };
//   }

//   static fromPayload(payload: any): ServiceCapabilities {
//     const capabilities = new ServiceCapabilities();
//     if (payload.nlp)
//       capabilities.nlp = NLPCapabilities.fromPayload(payload.nlp);
//     if (payload.computerVision)
//       capabilities.computerVision = ComputerVisionCapabilities.fromPayload(
//         payload.computerVision
//       );
//     if (payload.audioProcessing)
//       capabilities.audioProcessing = AudioProcessingCapabilities.fromPayload(
//         payload.audioProcessing
//       );
//     if (payload.cryptoTrading)
//       capabilities.cryptoTrading = CryptoTradingCapabilities.fromPayload(
//         payload.cryptoTrading
//       );
//     if (payload.dataAnalytics)
//       capabilities.dataAnalytics = DataAnalyticsCapabilities.fromPayload(
//         payload.dataAnalytics
//       );
//     if (payload.socialMedia)
//       capabilities.socialMedia = SocialMediaCapabilities.fromPayload(
//         payload.socialMedia
//       );
//     if (payload.automation)
//       capabilities.automation = AutomationCapabilities.fromPayload(
//         payload.automation
//       );
//     if (payload.securityMonitoring)
//       capabilities.securityMonitoring =
//         SecurityMonitoringCapabilities.fromPayload(payload.securityMonitoring);
//     return capabilities;
//   }
// }
export enum CapabilityTypes {
  NLP = 'nlp',
  ComputerVision = 'computerVision',
}

type CapabilityScope =
  | AudioProcessingCapabilities
  | AutomationCapabilities
  | CryptoTradingCapabilities
  | DataAnalyticsCapabilities
  | NLPCapabilities
  | SecurityMonitoringCapabilities
  | SocialMediaCapabilities
  | ComputerVisionCapabilities;

export class ServiceCapability {
  constructor(
    protected capabilityType: CapabilityTypes,
    protected scope: CapabilityScope
  ) {}

  toPayload(): Record<string, any> {
    return {
      capabilityType: this.capabilityType,
      scope: this.scope.toPayload(),
    };
  }

  static fromPayload(payload: {
    capabilityType: CapabilityTypes;
    scope: any;
  }): ServiceCapability {
    return new ServiceCapability(payload.capabilityType, payload.scope);
  }
}
