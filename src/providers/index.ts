import { ClientPayload, UUID } from '../entities';
import { Events, IEvents } from '../entities/event';
import { EntityType } from './interfaces';

export interface ISubRespData extends IEvents {
  modelType: EntityType | string;
  topic?: string;
}
type PartialWithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;
type PartialEvent = PartialWithRequired<
  IEvents,
  | 'app'
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
  | 'pld'
>;
export interface ISubRespData extends PartialEvent {
  modelType: string;
  topic?: string;
}
export type SubscriptionResponse = {
  subscriptionId: string;
  event: ISubRespData;
};

export interface SubscriptionEventHandler {
  onSubscribe?: (id: string) => void;
  onReceive: (response: SubscriptionResponse) => void;
  onError?: (error: Error) => void;
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

export * from './rest';
export * from './ws';
export * from './interfaces';
