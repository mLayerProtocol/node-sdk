export class SecurityMonitoringCapabilities {
  detectionTypes: string[];
  alerting: {
    realTime: boolean;
    channels: string[];
    customRules: boolean;
  };
  monitoring: {
    network: boolean;
    endpoints: boolean;
    applications: boolean;
    cloud: boolean;
  };
  responseActions: string[];
  complianceFrameworks: string[];
  threatIntelligence: boolean;

  toPayload(): Record<string, any> {
    return {
      detectionTypes: this.detectionTypes,
      alerting: this.alerting,
      monitoring: this.monitoring,
      responseActions: this.responseActions,
      complianceFrameworks: this.complianceFrameworks,
      threatIntelligence: this.threatIntelligence,
    };
  }

  static fromPayload(payload: any): SecurityMonitoringCapabilities {
    const capabilities = new SecurityMonitoringCapabilities();
    capabilities.detectionTypes = payload.detectionTypes;
    capabilities.alerting = payload.alerting;
    capabilities.monitoring = payload.monitoring;
    capabilities.responseActions = payload.responseActions;
    capabilities.complianceFrameworks = payload.complianceFrameworks;
    capabilities.threatIntelligence = payload.threatIntelligence;
    return capabilities;
  }
}
