import { isHexString, sha256 } from "ethers";
import { Utils } from "../helper";
import { HexString, AddressString, BaseEntity } from "./base";


export class Address extends BaseEntity {
  public prefix: string = 'did';
  public address: string = '';
  public chain: string = '';

  constructor(addressData?: {
    prefix?: 'mid' | 'mlid' | 'mldevid' | 'mltestid' | 'did';
    address: string;
    chain?: string;
  }) {
    super();
    this.prefix = addressData?.prefix ?? this.prefix;
    this.address = addressData?.address ?? this.address;
    this.chain = addressData?.chain ?? this.chain;
  }

  public toString(): string {
    return this.toAddressString();
  }

  public toAddressString(): AddressString {
    if (this.address == '') return '';
    return `${this.prefix}:${this.address}${
      this.chain == '' ? '' : '#' + this.chain
    }`;
  }
  static fromString(addressString: string, prefix: string = 'did'): Address {
    const addr = new Address();
    addr.prefix = prefix;
    const parts = addressString.split(':');
    addr.address = parts.length == 1 ? parts[0] : parts[1];
    const parts2 = addr.address.split('#');
    if (parts2.length > 1) {
      addr.address = parts2[0];
      addr.chain = parts2[1];
    }
    if (parts.length > 1) {
      addr.prefix = parts[0];
    }
    return addr;
  }
  /**
   * @override
   * @returns {Buffer}
   */
  public encodeBytes(): Buffer {
    return Utils.encodeBytes({
      type: 'string',
      value: this.toString().toLowerCase(),
    });
  }

  public toAccount(): Account {
    const acc = this;
    acc.prefix = 'mid';
    return acc as Account;
  }
  public toDevice(): Account {
    const acc = this;
    acc.prefix = 'did';
    return acc as Device;
  }
  public isValid(): boolean {
    return this.prefix.length > 0 && this.address.length > 10;
  }
}

export class Device extends Address {
  public prefix: string = 'did';
  public isValid(): boolean {
    return this.prefix == 'did' && this.address.length > 10;
  }
  static fromString(addressString: string): Device {
    return super.fromString(addressString, 'did') as Device;
  }
}

export class Account extends Address {
  public prefix: string = 'mid';
  public isValid(): boolean {
    return this.prefix == 'mid' && this.address.length > 10;
  }
  static fromString(addressString: string): Account {
    return super.fromString(addressString, 'mid') as Account;
  }
}