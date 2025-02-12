export class ComputerVisionCapabilities {
  supportedFormats: string[];
  features: {
    objectDetection: boolean;
    faceRecognition: boolean;
    imageClassification: boolean;
    imageSegmentation: boolean;
    poseEstimation: boolean;
    opticalCharacterRecognition: boolean;
    barcodeScanning: boolean;
    colorAnalysis: boolean;
    imageGeneration: boolean;
    styleTransfer: boolean;
    superResolution: boolean;
    depthEstimation: boolean;
    motionTracking: boolean;
    augmentedReality: boolean;
  };
  maxResolution: string;
  realTimeProcessing: boolean;
  batchProcessing: boolean;
  modelArchitectures: string[];
  customModelTraining: boolean;
  hardwareAcceleration: boolean;
  supportedDevices: string[];
  accuracy: {
    precision: number;
    recall: number;
    mAP: number;
  };

  toPayload(): Record<string, any> {
    return {
      supportedFormats: this.supportedFormats,
      features: this.features,
      maxResolution: this.maxResolution,
      realTimeProcessing: this.realTimeProcessing,
      batchProcessing: this.batchProcessing,
      modelArchitectures: this.modelArchitectures,
      customModelTraining: this.customModelTraining,
      hardwareAcceleration: this.hardwareAcceleration,
      supportedDevices: this.supportedDevices,
      accuracy: this.accuracy,
    };
  }

  static fromPayload(payload: any): ComputerVisionCapabilities {
    const capabilities = new ComputerVisionCapabilities();
    capabilities.supportedFormats = payload.supportedFormats;
    capabilities.features = payload.features;
    capabilities.maxResolution = payload.maxResolution;
    capabilities.realTimeProcessing = payload.realTimeProcessing;
    capabilities.batchProcessing = payload.batchProcessing;
    capabilities.modelArchitectures = payload.modelArchitectures;
    capabilities.customModelTraining = payload.customModelTraining;
    capabilities.hardwareAcceleration = payload.hardwareAcceleration;
    capabilities.supportedDevices = payload.supportedDevices;
    capabilities.accuracy = payload.accuracy;
    return capabilities;
  }
}
