import { isHexString } from 'ethers';
import { BaseEntity } from './base';
import { Utils } from '../helper';
import { Address } from './address';
import { SubscriberRole } from './subscription';
import { ClientPayload } from './clientPayload';
import { timestamp } from 'rxjs';

export type EntityPath = {
  mod: string;
  h: string;
  val: string;
};
export type EventPath = EntityPath;

export interface IEvents {
  // Primary
  id?: string; // id generated by node
  t?: number;
  pld?: ClientPayload<any>; // payload
  nonce?: string; // none
  ts?: BigInt; // timestamp
  assoc?: string[]; // associations
  preE?: EventPath; // previous event
  authE?: EventPath; // auth event
  pH?: string; // payload hash
  err?: string; // error
  h?: string; // hash
  snet?: string; // subnet
  sig?: string;
  br?: boolean; // subnet
  blk?: BigInt;
  cy?: BigInt; // subnet
  ep?: BigInt;
  isVal?: boolean; // subnet
  sync?: boolean;
  val?: string; // validator
  total?: BigInt; // total;
  // convenience fields
}

export class Events {
  public id: string = '';
  public payload?: ClientPayload<any> = undefined;
  public eventType?: number = undefined;
  public nonce?: string = '';
  public timestamp?: BigInt = undefined;
  public association?: string[] = [];
  public previousEvent?: EventPath = undefined;
  public authorizationEevent?: EventPath = undefined;
  public payloadHash?: string = '';
  public error: string = '';
  public hash: string = '';
  public subnet: string = '';
  public signature: string = '';
  public broadcasted: boolean = false;
  public blockNumber: BigInt = undefined;
  public cycle: BigInt = undefined;
  public epoch: BigInt = undefined;
  public isValid: boolean = undefined;
  public synced: boolean = undefined;
  public validator: string = '';
  public total: BigInt = undefined;

  /**
   * @override
   * @returns {IEvent}
   */
  public asPayload?(): IEvents {
    return {
      id: this.id, // id generated by node
      pld: this.payload, // payload
      nonce: this.nonce, // none
      t: this.eventType,
      ts: this.timestamp, // timestamp
      assoc: this.association, // associations
      preE: this.previousEvent, // previous event
      authE: this.authorizationEevent, // auth event
      pH: this.payloadHash, // payload hash
      err: this.error, // error
      h: this.hash, // hash
      snet: this.subnet, // subnet
      sig: this.signature,
      br: this.broadcasted, // subnet
      blk: this.blockNumber,
      cy: this.cycle, // subnet
      ep: this.epoch,
      isVal: this.isValid, // subnet
      sync: this.synced,
      val: this.validator, // validator
      total: this.total, // total;
    };
  }

  /* @override
   * @returns {IEvent}
   */
  static fromPayload(event: IEvents): Events {
    return Object.assign(new Events(), <Events>{
      id: event.id, // id generated by node
      eventType: event.t,
      payload: event.pld, // payload
      nonce: event.nonce, // none
      timestamp: event.ts, // timestamp
      associations: event.assoc, // associations
      previousEvent: event.preE, // previous event
      authorizationEvent: event.authE, // auth event
      payloadHash: event.pH, // payload hash
      error: event.err, // error
      hash: event.h, // hash
      subnet: event.snet, // subnet
      signature: event.sig,
      broadcasted: event.br, // subnet
      blockNumber: event.blk,
      cycle: event.cy, // subnet
      epoch: event.ep,
      isValid: event.isVal, // subnet
      synced: event.sync,
      validator: event.val, // validator
      total: event.total, // total;
    });
  }
  /*
encoder.EncoderParam{Type: encoder.StringEncoderDataType, Value: topic.ID},
		encoder.EncoderParam{Type: encoder.StringEncoderDataType, Value: topic.Meta},
		encoder.EncoderParam{Type: encoder.HexEncoderDataType, Value: topic.ParentTopicHash},
		encoder.EncoderParam{Type: encoder.StringEncoderDataType, Value: topic.Owner},
		encoder.EncoderParam{Type: encoder.BoolEncoderDataType, Value: *topic.Public},
		encoder.EncoderParam{Type: encoder.StringEncoderDataType, Value: topic.Ref},
		encoder.EncoderParam{Type: encoder.BoolEncoderDataType, Value: *topic.ReadOnly},
		encoder.EncoderParam{Type: encoder.StringEncoderDataType, Value: topic.Subnet},
// */
  //   /**
  //    * @override
  //    * @returns {Buffer}
  //    */
  //   public encodeBytes(): Buffer {
  //    const d = this.payload.encodeBytes()

  // // 	return Utils.encodeBytes(
  // // 		encoder.EncoderParam{Type: encoder.ByteEncoderDataType, Value: d},
  // // 		encoder.EncoderParam{Type: encoder.HexEncoderDataType, Value: strings.Join(e.Associations, "")},
  // // 		encoder.EncoderParam{Type: encoder.HexEncoderDataType, Value: e.AuthEvent.Hash},
  // // 		encoder.EncoderParam{Type: encoder.IntEncoderDataType, Value: e.BlockNumber},
  // // 		encoder.EncoderParam{Type: encoder.IntEncoderDataType, Value: e.Cycle},
  // // 		encoder.EncoderParam{Type: encoder.IntEncoderDataType, Value: e.Epoch},
  // // 		encoder.EncoderParam{Type: encoder.IntEncoderDataType, Value: e.EventType},
  // // 		encoder.EncoderParam{Type: encoder.HexEncoderDataType, Value: e.PreviousEvent.Hash},
  // // 		encoder.EncoderParam{Type: encoder.ByteEncoderDataType, Value: utils.UuidToBytes(e.Subnet)},
  // // 		encoder.EncoderParam{Type: encoder.IntEncoderDataType, Value: e.Timestamp},
  // // 	)
  // // }
  //     return Utils.encodeBytes(
  //       { type: 'byte', value: d},
  //       { type: 'hex', value: this.defaultSubscriberRole },
  //       { type: 'string', value: this.id },
  //       { type: 'string', value: this.meta },
  //       { type: 'hex', value: this.parentTopicHash },
  //       { type: 'boolean', value: this.public },
  //       { type: 'boolean', value: this.readOnly },
  //       { type: 'string', value: this.ref }
  //       // { type: 'string', value: this.subnet }
  //     );
  //   }
}
