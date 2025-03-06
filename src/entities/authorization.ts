import { isHexString, sha256 } from "ethers";
import { Utils } from "../helper";
import { HexString, AddressString, BaseEntity, DeviceString } from './base';
import { Account, Address, Device } from './address';

export enum AuthorizationPrivilege {
  Unauthorized = 0,
  Guest = 10,
  Member = 20,
  Manager = 30,
  Admin = 40,
}

export interface ISignatureData {
  ty: string;
  pubK?: string;
  sig: string;
}

export class SignatureData {
  constructor(
    public type: '' | 'tendermint/PubKeySecp256k1' | 'eth',
    public publicKey: string,
    public signature: string
  ) {
    type = '';
    publicKey = '';
    signature = '';
  }

  /**
   * @override
   * @returns {IAuthorization}
   */
  public asPayload(): ISignatureData {
    return {
      ty: this.type,
      pubK: this.publicKey,
      sig: this.signature,
    };
  }
}

export interface IAuthorization {
  auth: AddressString;
  gr: AddressString;
  acct: AddressString;
  privi: AuthorizationPrivilege;
  topIds: string; // "*" all topics or comma separated list of topic ids
  du: number; // duration
  app: string; // app
  ts: number; // timestmap
  sigD: ISignatureData; // signatureData
  meta?: string; // description
}

export class Authorization extends BaseEntity {
  public account: Account = new Account();
  public authorized: Address = new Address();
  public grantor: Account = new Account();
  public privilege: AuthorizationPrivilege = 0;
  public topicIds: string = '';
  public timestamp: number;
  public duration: number;
  public app: string = '';
  public meta: string = '';
  public signatureData: SignatureData = new SignatureData('', '', '');

  /**
   * @override
   * @returns {IAuthorization}
   */
  public asPayload(): IAuthorization {
    return {
      auth: this.authorized.toAddressString(),
      acct: this.account.toString(),
      gr: this.grantor.toString(),
      privi: this.privilege,
      topIds: this.topicIds,
      meta: this.meta,
      ts: this.timestamp,
      du: this.duration,
      app: this.app,
      sigD: this.signatureData.asPayload(),
    };
  }

  /**
   * @override
   * @returns {Buffer}
   */
  public encodeBytes(): Buffer {
    return Utils.encodeBytes(
      { type: 'address', value: this.account.toString() },
      { type: 'address', value: this.authorized.toString() },
      { type: 'int', value: this.duration },
      { type: 'string', value: this.meta },
      { type: 'int', value: this.privilege },
      { type: 'byte', value: Utils.uuidToBytes(this.app) },
      { type: 'int', value: this.timestamp },
      { type: 'string', value: this.topicIds }
    );
  }
}
