import { BaseEntity } from './base';
import { Utils } from '../helper';

type AddressString = string;
type HexString = string;

export interface IWallet {
  // Primary
  id?: string; // id generated by node
  snet?: string; // optional custom subnet
  n: string; // name
  acct?: AddressString; // owner of subNetwork
  ts?: number; // timestamp in millisec

  // sig?: HexString;
  // hash?: HexString;
}

export class Wallet extends BaseEntity {
  public id: string = '';
  public name: string = '';
  public account: string = '';
  public timestamp: number = 0;
  public subnet: string = '';

  /**
   * @override
   * @returns {IWallet}
   */
  public asPayload(): IWallet {
    return {
      id: this.id,

      n: this.name,
      snet: this.subnet,
      acct: this.account,
    };
  }

  /**
   * @override
   * @returns {Buffer}
   */
  public encodeBytes(): Buffer {
    return Utils.encodeBytes(
      { type: 'string', value: this.name },
      { type: 'hex', value: this.subnet },
      { type: 'string', value: this.account }
    );
  }
}
