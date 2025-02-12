export class DataAnalyticsCapabilities {
  supportedDataTypes: string[];
  algorithms: string[];
  modelTypes: string[];
  visualizations: string[];
  maxDataSize: string;
  realTimeProcessing: boolean;
  features: {
    anomalyDetection: boolean;
    forecasting: boolean;
    clustering: boolean;
    classification: boolean;
    regression: boolean;
  };

  toPayload(): Record<string, any> {
    return {
      supportedDataTypes: this.supportedDataTypes,
      algorithms: this.algorithms,
      modelTypes: this.modelTypes,
      visualizations: this.visualizations,
      maxDataSize: this.maxDataSize,
      realTimeProcessing: this.realTimeProcessing,
      features: this.features,
    };
  }

  static fromPayload(payload: any): DataAnalyticsCapabilities {
    const capabilities = new DataAnalyticsCapabilities();
    capabilities.supportedDataTypes = payload.supportedDataTypes;
    capabilities.algorithms = payload.algorithms;
    capabilities.modelTypes = payload.modelTypes;
    capabilities.visualizations = payload.visualizations;
    capabilities.maxDataSize = payload.maxDataSize;
    capabilities.realTimeProcessing = payload.realTimeProcessing;
    capabilities.features = payload.features;
    return capabilities;
  }
}
