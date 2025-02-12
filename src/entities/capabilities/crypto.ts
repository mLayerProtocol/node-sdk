export class CryptoTradingCapabilities {
  supportedChains: string[];
  supportedTokens: string[];
  tradingStrategies: string[];
  maxTransactionValue: string;
  dexSwapping: {
    supportedDEXs: string[];
    aggregators: string[];
    maxSlippage: number;
    crossChainSupport: boolean;
    flashloanSupport: boolean;
    liquidityProvision: boolean;
    impermanentLossProtection: boolean;
    gasOptimization: boolean;
    routeOptimization: boolean;
  };
  riskManagement: {
    stopLoss: boolean;
    takeProfit: boolean;
    positionSizing: boolean;
    leverageLimit: number;
    slippageProtection: boolean;
    sandwichProtection: boolean;
  };
  features: string[];

  toPayload(): Record<string, any> {
    return {
      supportedChains: this.supportedChains,
      supportedTokens: this.supportedTokens,
      tradingStrategies: this.tradingStrategies,
      maxTransactionValue: this.maxTransactionValue,
      riskManagement: this.riskManagement,
      features: this.features,
    };
  }

  static fromPayload(payload: any): CryptoTradingCapabilities {
    const capabilities = new CryptoTradingCapabilities();
    capabilities.supportedChains = payload.supportedChains;
    capabilities.supportedTokens = payload.supportedTokens;
    capabilities.tradingStrategies = payload.tradingStrategies;
    capabilities.maxTransactionValue = payload.maxTransactionValue;
    capabilities.dexSwapping = payload.dexSwapping;
    capabilities.riskManagement = payload.riskManagement;
    capabilities.features = payload.features;
    return capabilities;
  }
}
