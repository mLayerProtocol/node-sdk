import { HexString } from './base';
import { EntityCapability } from './capabilities';
import { AudioProcessingCapabilities } from './capabilities/audio';
import { AutomationCapabilities } from './capabilities/automation';
import { CryptoTradingCapabilities } from './capabilities/crypto';
import { DataAnalyticsCapabilities } from './capabilities/data';
import { NLPCapabilities } from './capabilities/nlp';
import { SecurityMonitoringCapabilities } from './capabilities/security';
import { SocialMediaCapabilities } from './capabilities/social';
import { ComputerVisionCapabilities } from './capabilities/vision';

export enum EntityType {
  Account = 'account',
  Organization = 'organization',
  AI = 'ai',
  Device = 'device',
  SmartContract = 'smart_contract',
  Api = 'api',
  Bot = 'bots',
  Feed = 'data_feeds',
}

// Example implementations of fromPayload for each class:

export class DataEncryption {
  constructor(
    public atRest: boolean,
    public inTransit: boolean,
    public standard: string
  ) {}

  static fromPayload(payload: Record<string, any>): DataEncryption {
    return new DataEncryption(
      payload.atRest,
      payload.inTransit,
      payload.standard
    );
  }

  toPayload(): Record<string, any> {
    return {
      atRest: this.atRest,
      inTransit: this.inTransit,
      standard: this.standard,
    };
  }
}

export class AccessControls {
  constructor(public type: string, public permissions: string[]) {}

  static fromPayload(payload: Record<string, any>): AccessControls {
    return new AccessControls(payload.type, payload.permissions);
  }

  toPayload(): Record<string, any> {
    return {
      type: this.type,
      permissions: this.permissions,
    };
  }
}

export class SecurityProfile {
  constructor(
    public authenticationRequired: boolean,
    public authMethods: string[],
    public dataEncryption: DataEncryption,
    public accessControls: AccessControls,
    public auditLogging: boolean
  ) {}

  static fromPayload(payload: Record<string, any>): SecurityProfile {
    return new SecurityProfile(
      payload.authenticationRequired,
      payload.authMethods,
      DataEncryption.fromPayload(payload.dataEncryption),
      AccessControls.fromPayload(payload.accessControls),
      payload.auditLogging
    );
  }

  toPayload(): Record<string, any> {
    return {
      authenticationRequired: this.authenticationRequired,
      authMethods: this.authMethods,
      dataEncryption: this.dataEncryption.toPayload(),
      accessControls: this.accessControls.toPayload(),
      auditLogging: this.auditLogging,
    };
  }
}

export class Key {
  constructor(
    public keyType: string,
    public key: Uint8Array,
    public description: string
  ) {}

  static fromPayload(payload: Record<string, any>): Key {
    return new Key(payload.keyType, payload.key, payload.description);
  }

  toPayload(): Record<string, any> {
    return {
      keyType: this.keyType,
      key: this.key,
      description: this.description,
    };
  }
}

export class Keys {
  constructor(public identityKey: Key, public deviceKeys: Key[]) {}

  static fromPayload(payload: Record<string, any>): Keys {
    return new Keys(
      Key.fromPayload(payload.idKeys),
      payload.deviceKeys.map((key: any) => Key.fromPayload(key))
    );
  }

  toPayload(): Record<string, any> {
    return {
      idKeys: this.identityKey.toPayload(),
      deviceKeys: this.deviceKeys.map((key) => key.toPayload()),
    };
  }
}

export class Creator {
  constructor(
    public name?: string,
    public organization?: string,
    public contact?: string,
    public publicKey?: HexString
  ) {}

  static fromPayload(payload: Record<string, any>): Creator {
    return new Creator(payload.name, payload.organization, payload.contact);
  }

  toPayload(): Record<string, any> {
    return {
      name: this.name,
      organization: this.organization,
      contact: this.contact,
    };
  }
}

export class EntityMetadata {
  constructor(
    public externalId?: string,
    public name?: string,
    public version?: string,
    public description?: string,
    public creator?: Creator,
    public license?: string,
    public created?: Date,
    public lastUpdated?: Date,
    public status?: string
  ) {}

  static fromPayload(payload: Record<string, any>): EntityMetadata {
    return new EntityMetadata(
      payload.externalId,
      payload.name,
      payload.version,
      payload.description,
      Creator.fromPayload(payload.creator),
      payload.license,
      new Date(payload.created),
      new Date(payload.lastUpdated),
      payload.status
    );
  }

  toPayload(): Record<string, any> {
    return {
      externalId: this.externalId,
      name: this.name,
      version: this.version,
      description: this.description,
      creator: this.creator.toPayload(),
      license: this.license,
      created: this.created.toISOString(),
      lastUpdated: this.lastUpdated.toISOString(),
      status: this.status,
    };
  }
}

export class LatencyMetrics {
  constructor(public average: number, public p95: number, public p99: number) {}

  static fromPayload(payload: Record<string, any>): LatencyMetrics {
    return new LatencyMetrics(payload.average, payload.p95, payload.p99);
  }

  toPayload(): Record<string, any> {
    return {
      average: this.average,
      p95: this.p95,
      p99: this.p99,
    };
  }
}

export class ThroughputMetrics {
  constructor(
    public requestsPerSecond: number,
    public maxConcurrentRequests: number
  ) {}

  static fromPayload(payload: Record<string, any>): ThroughputMetrics {
    return new ThroughputMetrics(
      payload.requestsPerSecond,
      payload.maxConcurrentRequests
    );
  }

  toPayload(): Record<string, any> {
    return {
      requestsPerSecond: this.requestsPerSecond,
      maxConcurrentRequests: this.maxConcurrentRequests,
    };
  }
}

export class ReliabilityMetrics {
  constructor(
    public uptime: number,
    public errorRate: number,
    public mttr: number
  ) {}

  static fromPayload(payload: Record<string, any>): ReliabilityMetrics {
    return new ReliabilityMetrics(
      payload.uptime,
      payload.errorRate,
      payload.mttr
    );
  }

  toPayload(): Record<string, any> {
    return {
      uptime: this.uptime,
      errorRate: this.errorRate,
      mttr: this.mttr,
    };
  }
}

export class PerformanceMetrics {
  constructor(
    public latency: LatencyMetrics,
    public throughput: ThroughputMetrics,
    public reliability: ReliabilityMetrics
  ) {}

  static fromPayload(payload: Record<string, any>): PerformanceMetrics {
    return new PerformanceMetrics(
      LatencyMetrics.fromPayload(payload.latency),
      ThroughputMetrics.fromPayload(payload.throughput),
      ReliabilityMetrics.fromPayload(payload.reliability)
    );
  }

  toPayload(): Record<string, any> {
    return {
      latency: this.latency.toPayload(),
      throughput: this.throughput.toPayload(),
      reliability: this.reliability.toPayload(),
    };
  }
}

export class RateLimit {
  constructor(public requestsPerMinute: number, public burstLimit: number) {}

  static fromPayload(payload: Record<string, any>): RateLimit {
    return new RateLimit(payload.requestsPerMinute, payload.burstLimit);
  }

  toPayload(): Record<string, any> {
    return {
      requestsPerMinute: this.requestsPerMinute,
      burstLimit: this.burstLimit,
    };
  }
}

export class Parameter {
  constructor(
    public name: string,
    public type: string,
    public required: boolean,
    public description: string
  ) {}

  static fromPayload(payload: Record<string, any>): Parameter {
    return new Parameter(
      payload.name,
      payload.type,
      payload.required,
      payload.description
    );
  }

  toPayload(): Record<string, any> {
    return {
      name: this.name,
      type: this.type,
      required: this.required,
      description: this.description,
    };
  }
}

export class APIEndpoint {
  constructor(
    public url: string,
    public method: string,
    public authentication: string,
    public rateLimit: RateLimit,
    public parameters: Parameter[]
  ) {}

  static fromPayload(payload: Record<string, any>): APIEndpoint {
    return new APIEndpoint(
      payload.url,
      payload.method,
      payload.authentication,
      RateLimit.fromPayload(payload.rateLimit),
      payload.parameters.map((param: any) => Parameter.fromPayload(param))
    );
  }

  toPayload(): Record<string, any> {
    return {
      url: this.url,
      method: this.method,
      authentication: this.authentication,
      rateLimit: this.rateLimit.toPayload(),
      parameters: this.parameters.map((param) => param.toPayload()),
    };
  }
}

export class API {
  constructor(
    public baseURL: string,
    public version: string,
    public endpoints: APIEndpoint[],
    public documentation: string
  ) {}

  static fromPayload(payload: Record<string, any>): API {
    return new API(
      payload.baseURL,
      payload.version,
      payload.endpoints.map((endpoint: any) =>
        APIEndpoint.fromPayload(endpoint)
      ),
      payload.documentation
    );
  }

  toPayload(): Record<string, any> {
    return {
      baseURL: this.baseURL,
      version: this.version,
      endpoints: this.endpoints.map((endpoint) => endpoint.toPayload()),
      documentation: this.documentation,
    };
  }
}

export class PricingRate {
  constructor(public base: number, public unit: string) {}

  static fromPayload(payload: Record<string, any>): PricingRate {
    return new PricingRate(payload.base, payload.unit);
  }

  toPayload(): Record<string, any> {
    return {
      base: this.base,
      unit: this.unit,
    };
  }
}

export class PricingTier {
  constructor(
    public name: string,
    public limit: number,
    public price: number
  ) {}

  static fromPayload(payload: Record<string, any>): PricingTier {
    return new PricingTier(payload.name, payload.limit, payload.price);
  }

  toPayload(): Record<string, any> {
    return {
      name: this.name,
      limit: this.limit,
      price: this.price,
    };
  }
}

export class Pricing {
  constructor(
    public model: string,
    public rates?: PricingRate,
    public tiers?: PricingTier[],
    public currencySymbol?: string,
    public currencyId?: string,
    public currencyDomain?: string,
    public currencyType?: string
  ) {}

  static fromPayload(payload: Record<string, any>): Pricing {
    return new Pricing(
      payload.model,
      payload.rates ? PricingRate.fromPayload(payload.rates) : undefined,
      payload.tiers
        ? payload.tiers.map((tier: any) => PricingTier.fromPayload(tier))
        : undefined,
      payload.currency,
      payload.currencyId,
      payload.currencyDomain,
      payload.CurrencyType
    );
  }

  toPayload(): Record<string, any> {
    return {
      model: this.model,
      rates: this.rates?.toPayload(),
      tiers: this.tiers?.map((tier) => tier.toPayload()),
      currency: this.currencySymbol,
      currencyId: this.currencyId,
      currencyDomain: this.currencyDomain,
      CurrencyType: this.currencyType,
    };
  }
}

export class DataPrivacy {
  constructor(
    public gdpr: boolean,
    public ccpa: boolean,
    public hipaa: boolean
  ) {}

  static fromPayload(payload: Record<string, any>): DataPrivacy {
    return new DataPrivacy(payload.gdpr, payload.ccpa, payload.hipaa);
  }

  toPayload(): Record<string, any> {
    return {
      gdpr: this.gdpr,
      ccpa: this.ccpa,
      hipaa: this.hipaa,
    };
  }
}

export class Compliance {
  constructor(
    public certifications: string[],
    public dataPrivacy: DataPrivacy,
    public auditReports: string[]
  ) {}

  static fromPayload(payload: Record<string, any>): Compliance {
    return new Compliance(
      payload.certifications,
      DataPrivacy.fromPayload(payload.dataPrivacy),
      payload.auditReports
    );
  }

  toPayload(): Record<string, any> {
    return {
      certifications: this.certifications,
      dataPrivacy: this.dataPrivacy.toPayload(),
      auditReports: this.auditReports,
    };
  }
}

// Previous classes remain the same...

export class Dependencies {
  constructor(
    public required: string[],
    public optional: string[],
    public conflicts: string[]
  ) {}

  static fromPayload(payload: Record<string, any>): Dependencies {
    return new Dependencies(
      payload.required,
      payload.optional,
      payload.conflicts
    );
  }

  toPayload(): Record<string, any> {
    return {
      required: this.required,
      optional: this.optional,
      conflicts: this.conflicts,
    };
  }
}

export class Dataset {
  constructor(
    public name: string,
    public version: string,
    public size: string,
    public type: string
  ) {}

  static fromPayload(payload: Record<string, any>): Dataset {
    return new Dataset(
      payload.name,
      payload.version,
      payload.size,
      payload.type
    );
  }

  toPayload(): Record<string, any> {
    return {
      name: this.name,
      version: this.version,
      size: this.size,
      type: this.type,
    };
  }
}

export class EvaluationMetric {
  constructor(
    public name: string,
    public value: number,
    public description: string
  ) {}

  static fromPayload(payload: Record<string, any>): EvaluationMetric {
    return new EvaluationMetric(
      payload.name,
      payload.value,
      payload.description
    );
  }

  toPayload(): Record<string, any> {
    return {
      name: this.name,
      value: this.value,
      description: this.description,
    };
  }
}

export class Training {
  constructor(
    public dataset: Dataset,
    public method: string,
    public evaluationMetrics: EvaluationMetric[]
  ) {}

  static fromPayload(payload: Record<string, any>): Training {
    return new Training(
      Dataset.fromPayload(payload.dataset),
      payload.method,
      payload.evaluationMetrics.map((metric: any) =>
        EvaluationMetric.fromPayload(metric)
      )
    );
  }

  toPayload(): Record<string, any> {
    return {
      dataset: this.dataset.toPayload(),
      method: this.method,
      evaluationMetrics: this.evaluationMetrics.map((metric) =>
        metric.toPayload()
      ),
    };
  }
}

export class AdminAuthority {
  constructor(
    public externalId: string,
    public authorizedAccount: string,
    public entityAccount: string,
    public timestamp?: number,
    public signature?: any
  ) {}

  static fromPayload(payload: Record<string, any>): AdminAuthority {
    return new AdminAuthority(
      payload.externalId,
      payload.authorizedAccount,
      payload.entityAccount,
      payload.ts,
      payload.sign
    );
  }

  toPayload(): Record<string, any> {
    return {
      externalId: this.externalId,
      authorizedAccount: this.authorizedAccount,
      entityAccount: this.entityAccount,
      ts: this.timestamp,
      sign: this.signature,
    };
  }
}

export class AgentTopic {
  constructor(
    public id: string,
    public sampleMessage: string,
    public isPublic: boolean
  ) {}

  static fromPayload(payload: Record<string, any>): AgentTopic {
    return new AgentTopic(payload.id, payload.sample_message, payload.public);
  }

  toPayload(): Record<string, any> {
    return {
      id: this.id,
      sample_message: this.sampleMessage,
      public: this.isPublic,
    };
  }
}

export class RegistryEntity {
  constructor(
    type: EntityType,
    externalId: string,
    name: string,
    description: string
  ) {
    this.metadata = new EntityMetadata();
    this.entityType = type;
    this.metadata.externalId = externalId;
    this.metadata.name = name;
    this.metadata.description = description;
    this.capabilities = [];
  }
  // REQUIRED fields
  version: number; // maps to _v
  reference: string; // maps to ref
  entityType: EntityType; // maps to _t
  adminAuthority: AdminAuthority; // maps to admin_authority

  // Optional fields with underscore prefix
  id?: string; // maps to _id
  uri?: string; // maps to _uri

  // Core entity data
  metadata: EntityMetadata;
  capabilities: EntityCapability[];
  security: SecurityProfile;
  performance: PerformanceMetrics;
  api: API;
  pricing: Pricing;
  compliance: Compliance;
  dependencies: Dependencies;
  training: Training;

  // Additional fields
  interfaceKeys: string[];
  topics: AgentTopic[];

  toPayload(): Record<string, any> {
    return {
      _v: this.version,
      ref: this.reference,
      _t: this.entityType,
      admin_authority: this.adminAuthority.toPayload(),
      _id: this.id,
      _uri: this.uri,
      metadata: this.metadata.toPayload(),
      capabilities: this.capabilities.map((cap) => cap.toPayload()),
      security: this.security.toPayload(),
      performance: this.performance.toPayload(),
      api: this.api.toPayload(),
      pricing: this.pricing.toPayload(),
      compliance: this.compliance.toPayload(),
      dependencies: this.dependencies.toPayload(),
      training: this.training.toPayload(),
      interface_keys: this.interfaceKeys,
      topics: this.topics.map((topic) => topic.toPayload()),
    };
  }

  static fromPayload(payload: any): RegistryEntity {
    const entity = new RegistryEntity(
      payload.entityType,
      payload.metadata?.externalId,
      payload.metadata?.name,
      payload.metadata?.description
    );
    entity.version = payload._v;
    entity.reference = payload.ref;
    entity.entityType = payload._t as EntityType;
    entity.adminAuthority = AdminAuthority.fromPayload(payload.admin_authority);
    entity.id = payload._id;
    entity.uri = payload._uri;
    entity.metadata = EntityMetadata.fromPayload(payload.metadata);
    entity.capabilities = payload.capabilities?.map((cap: any) =>
      EntityCapability.fromPayload(cap)
    );
    entity.security = SecurityProfile.fromPayload(payload.security);
    entity.performance = PerformanceMetrics.fromPayload(payload.performance);
    entity.api = API.fromPayload(payload.api);
    entity.pricing = Pricing.fromPayload(payload.pricing);
    entity.compliance = Compliance.fromPayload(payload.compliance);
    entity.dependencies = Dependencies.fromPayload(payload.dependencies);
    entity.training = Training.fromPayload(payload.training);
    entity.interfaceKeys = payload.interface_keys;
    entity.topics = payload.topics.map((t: any) => AgentTopic.fromPayload(t));
    return entity;
  }
}
