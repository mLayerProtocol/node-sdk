export class AudioProcessingCapabilities {
  supportedFormats: string[];
  features: {
    speechToText: boolean;
    textToSpeech: boolean;
    voiceRecognition: boolean;
    speakerDiarization: boolean;
    emotionDetection: boolean;
    noiseCancellation: boolean;
    audioEnhancement: boolean;
    accentNeutralization: boolean;
    musicAnalysis: boolean;
    soundClassification: boolean;
    audioGeneration: boolean;
    liveTranscription: boolean;
    multilingualSupport: boolean;
    customVoiceCloning: boolean;
  };
  languages: string[];
  maxDuration: string;
  sampleRate: number;
  bitDepth: number;
  channels: number;
  realTimeProcessing: boolean;
  streamingSupport: boolean;
  noiseReductionLevel: number;
  customizableFilters: boolean;
  voicePrints: boolean;

  toPayload(): Record<string, any> {
    return {
      supportedFormats: this.supportedFormats,
      features: this.features,
      languages: this.languages,
      maxDuration: this.maxDuration,
      sampleRate: this.sampleRate,
      bitDepth: this.bitDepth,
      channels: this.channels,
      realTimeProcessing: this.realTimeProcessing,
      streamingSupport: this.streamingSupport,
      noiseReductionLevel: this.noiseReductionLevel,
      customizableFilters: this.customizableFilters,
      voicePrints: this.voicePrints,
    };
  }

  static fromPayload(payload: any): AudioProcessingCapabilities {
    const capabilities = new AudioProcessingCapabilities();
    capabilities.supportedFormats = payload.supportedFormats;
    capabilities.features = payload.features;
    capabilities.languages = payload.languages;
    capabilities.maxDuration = payload.maxDuration;
    capabilities.sampleRate = payload.sampleRate;
    capabilities.bitDepth = payload.bitDepth;
    capabilities.channels = payload.channels;
    capabilities.realTimeProcessing = payload.realTimeProcessing;
    capabilities.streamingSupport = payload.streamingSupport;
    capabilities.noiseReductionLevel = payload.noiseReductionLevel;
    capabilities.customizableFilters = payload.customizableFilters;
    capabilities.voicePrints = payload.voicePrints;
    return capabilities;
  }
}
