import { AddressString, BaseEntity, ChainId, HexString } from './base';
import { Utils } from '../helper';
import { Address } from './address';


export enum AdminSubnetEventType {
  'DeleteSubnet' = 500,
  'CreateSubnet' = 501, // m.room.create
  // "PrivacySet" = 1002,
  // "BanMember" = 1003,
  // "UnbanMember" = 1004,
  // "ContractSet" = 1005,
  // "UpdateName" = 1006, //  m.room.name
  // "UpdateDescription" = 1007, //  m.room.topic
  // "UpdateAvatar" = 1008, //  m.room.avatar
  // "PinMessage" = 1008, //  m.room.avatar
  'UpdateSubnet' = 509, // m.room.create
  // "UpgradeSubscriberEvent" = 1010,
}

export enum AuthorizeEventType {
  'AuthorizeEvent' = 600,
  'UnauthorizeEvent' = 601,
}
// // Administrative Topic Actions
export enum AdminTopicEventType {
  'DeleteTopic' = 1000,
  'CreateTopic' = 1001, // m.room.create
  'PrivacySet' = 1002,
  'BanMember' = 1003,
  'UnbanMember' = 1004,
  'ContractSet' = 1005,
  'UpdateName' = 1006, //  m.room.name
  'UpdateDescription' = 1007, //  m.room.topic
  'UpdateAvatar' = 1008, //  m.room.avatar
  'PinMessage' = 1008, //  m.room.avatar
  'UpdateTopic' = 1009, // m.room.create
  'UpgradeSubscriberEvent' = 1010,
}

// Member Topic Actions
export enum MemberTopicEventType {
  'UnsubscribeEvent' = 1100,
  'SubscribeEvent' = 1101,
  'RequestedEvent' = 1102,
  'ApprovedEvent' = 1103,
  'UpgradedEvent' = 1104,
  'InvitedEvent' = 1105,
}

// // Message Actions
export enum MemberMessageEventType {
  'DeleteMessageEvent ' = 1200, //m.room.encrypted
  'SendMessageEvent' = 1201, // m.room.message
  // CreateReaction          EventType = 1202 // m.reaction
  // IsTyping                EventType = 1203
}




// // Administrative Topic Actions
export enum AdminWalletEventType {
  'DeleteWallet' = 1400,
  'CreateWallet' = 1401, // m.room.create
  // "PrivacySet" = 1002,
  // "BanMember" = 1003,
  // "UnbanMember" = 1004,
  // "ContractSet" = 1005,
  // "UpdateName" = 1006, //  m.room.name
  // "UpdateDescription" = 1007, //  m.room.topic
  // "UpdateAvatar" = 1008, //  m.room.avatar
  // "PinMessage" = 1008, //  m.room.avatar
  'WalletTopic' = 1409, // m.room.create
  // "UpgradeSubscriberEvent" = 1010,
}

export interface IClientPayload {
  // Primary
  d: unknown; // `data`
  ts: number; // `timestamp`
  ty: number; // `type`
  val: AddressString;
  nonce: number;
  snet?: string;
  // Secondary
  sig: HexString;
  h: HexString;
  acct: AddressString;
  chId: string;
}



export class ClientPayload<T> extends BaseEntity {
  public data: T;
  public timestamp: number = 0;
  public account: Address = new Address();
  public validator: string = '';
  public eventType:
    | AuthorizeEventType
    | AdminTopicEventType
    | AdminSubnetEventType
    | AdminWalletEventType
    | MemberTopicEventType
    | MemberMessageEventType;
  public authHash: string = '';
  public nonce: number = 0;
  public subnet: string = '';
  public chainId: ChainId = new ChainId('');

  // Secondary
  public signature: string = '';
  public hash: string = '';

  public encodeBytes(): Buffer {
    if (
      this.chainId.get() == '' &&
      ![
        ...Object.values(AuthorizeEventType),
        ...Object.values(AdminSubnetEventType),
      ].find((d: any) => Number(d) == Number(this.eventType))
    ) {
      throw 'chainId is required';
    }
    return Utils.encodeBytes(
      {
        type: 'byte',
        value: this.chainId.bytes(),
      },
      {
        type: 'byte',
        value: Utils.keccak256Hash((this.data as BaseEntity).encodeBytes()),
      },
      { type: 'int', value: this.eventType },
      { type: 'byte', value: Utils.uuidToBytes(this.subnet) },
      ...((this.account?.toString() ?? '') == ''
        ? []
        : ([{ type: 'address', value: this.account.toString() }] as any[])),
      // { type: "hex", value: this.authHash },

      { type: 'hex', value: this.validator },
      { type: 'int', value: this.nonce },
      { type: 'int', value: this.timestamp }
    );
  }

  /**
   * @override
   * @returns {IAuthorization}
   */
  public asPayload(): IClientPayload {
    return {
      chId: String(this.chainId),
      d: (this.data as BaseEntity).asPayload(),
      ts: this.timestamp,
      ty: this.eventType,
      sig: this.signature,
      snet: this.subnet,
      h: this.hash,
      val: this.validator,
      acct: this.account.toAddressString(),
      nonce: this.nonce,
    };
  }

  /**
   * @override
   * @returns {IAuthorization}
   */
  public fromPayload(payload: IClientPayload): ClientPayload<unknown> {
    this.chainId = new ChainId(payload.chId);
    this.data = payload.d as any;
    this.timestamp = payload.ts;
    this.eventType = payload.ty;
    this.signature = payload.sig;
    this.subnet = payload.snet;
    this.hash = payload.h;
    this.validator = payload.val;
    this.account = Address.fromString(payload.acct);
    this.nonce = payload.nonce;
    return this;
  }

  public sign(params: {
    chainId: string | number;
    agentPrivateKey: string;
    validator: string;
  }): ClientPayload<T> {
    if (!this.timestamp) this.timestamp = Date.now();
    this.chainId = new ChainId(String(params.chainId));
    this.validator = params.validator;
    const pb = this.encodeBytes();
    this.signature = Utils.signMessageEcc(pb, params.agentPrivateKey);
    console.log('validator', params.validator, this.validator);
    return this;
  }
}
