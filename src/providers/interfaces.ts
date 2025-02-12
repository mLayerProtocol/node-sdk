import { SubscriptionEventHandler } from '.';
import { ClientPayload, UUID } from '../entities';
import { Events, IEvents } from '../entities/event';

export enum EntityType {
  Auth = 'auth',
  Topic = 'top',
  Subscription = 'sub',
  Message = 'msg',
  Subnet = 'snet',
  Wallet = 'wal',
}

export type FilterValue = '*' | EntityType | UUID;
type ExludedFilter = Exclude<string, 'snet'>;
export type FilterV2 = {
  snet: UUID;
  t: EntityType;
  f: Record<ExludedFilter, any>;
};
export type EventFilter = Record<UUID | EntityType, FilterValue[] | number>;
export type EventFilterV2 = {
  _v: 2;
  fs: FilterV2[];
};

export interface ISubRespData extends IEvents {
  modelType: string;
  topic?: string;
}
type PartialWithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;
type PartialEvent = PartialWithRequired<
  IEvents,
  | 'snet'
  | 'id'
  | 'blk'
  | 'cy'
  | 'ep'
  | 'h'
  | 'preE'
  | 'authE'
  | 'ts'
  | 'val'
  | 't'
>;
export interface ISubRespData extends PartialEvent {
  modelType: string;
  topic?: string;
}
export type SubscriptionResponse = {
  subscriptionId: string;
  event: ISubRespData;
};

export interface SubscriptionEvents {
  onSubscribe?: (id: string) => void;
  onReceive: (response: SubscriptionResponse) => void;
  onError?: (error: Error) => void;
}
export interface Provider {
  connect?: (options?: any) => Promise<boolean>;
  subscribe?: (
    filter: EventFilter | EventFilterV2,
    events: SubscriptionEventHandler
  ) => Promise<void>;
  endSubscription?: (subscriptionId: string) => Promise<void>;
  makeRequest: <T, O>(
    // payload: unknown,
    options: {
      path: string;
      method?: 'get' | 'put' | 'post' | 'patch' | 'delete';
      params?: Record<string, any>;
      payload?: ClientPayload<T> | undefined;
      prefix?: string;
    }
  ) => Promise<Record<string, unknown>>;
}

// export class Provider {
//   // async read<O>(
//   //   query: Record<string, unknown>,
//   //   options?: O
//   // ): Promise<Record<string, unknown> | Record<string, unknown>[]> {
//   //   return {};
//   // }
//   constructor() {}

//   public async connect?(): Promise<boolean> {
//     throw Error('function not callable');
//   }

//   public async subscribe?(
//     filter: EventFilter,
//     events: SubscriptionEvents
//   ): Promise<void> {
//     throw Error('function not callable');
//   }
//   async makeRequest(
//     // payload: unknown,
//     options?: unknown
//   ): Promise<Record<string, unknown>> {
//     return {};
//   }
// }

// export * from './rest';
// export * from './ws';
