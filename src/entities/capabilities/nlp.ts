export class NLPCapabilities {
  languages: string[];
  features: {
    textGeneration: boolean;
    translation: boolean;
    summarization: boolean;
    sentimentAnalysis: boolean;
    namedEntityRecognition: boolean;
    questionAnswering: boolean;
    textClassification: boolean;
    languageDetection: boolean;
    documentAnalysis: boolean;
    topicModeling: boolean;
    spellCheck: boolean;
    grammarCheck: boolean;
    chatbot: boolean;
    codeGeneration: boolean;
  };
  modelArchitecture: string;
  maxTokens: number;
  contextWindow: number;
  streamingSupport: boolean;
  customTraining: boolean;
  domainSpecialization: string[];
  outputFormats: string[];

  toPayload(): Record<string, any> {
    return {
      languages: this.languages,
      features: this.features,
      modelArchitecture: this.modelArchitecture,
      maxTokens: this.maxTokens,
      contextWindow: this.contextWindow,
      streamingSupport: this.streamingSupport,
      customTraining: this.customTraining,
      domainSpecialization: this.domainSpecialization,
      outputFormats: this.outputFormats,
    };
  }

  static fromPayload(payload: any): NLPCapabilities {
    const capabilities = new NLPCapabilities();
    capabilities.languages = payload.languages;
    capabilities.features = payload.features;
    capabilities.modelArchitecture = payload.modelArchitecture;
    capabilities.maxTokens = payload.maxTokens;
    capabilities.contextWindow = payload.contextWindow;
    capabilities.streamingSupport = payload.streamingSupport;
    capabilities.customTraining = payload.customTraining;
    capabilities.domainSpecialization = payload.domainSpecialization;
    capabilities.outputFormats = payload.outputFormats;
    return capabilities;
  }
}
