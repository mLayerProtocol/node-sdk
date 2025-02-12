import { encode, decode } from '@msgpack/msgpack';
import { Message } from './entities';
import { Utils } from './helper';

export enum EncoderType {
  MessagePack = 'msgpack',
  Json = 'json',
}

export class DataEncoder {
  constructor(public encoderType: EncoderType = EncoderType.MessagePack) {}

  public encode<T extends Record<any, any>>(obj: T): Buffer {
    let encoded: Buffer;
    switch (this.encoderType) {
      case EncoderType.MessagePack:
        const uarr = encode(obj);
        encoded = Buffer.from(uarr.buffer, uarr.byteOffset, uarr.byteLength);
        break;
      case EncoderType.Json:
        encoded = Buffer.from(JSON.stringify(obj));
        break;
    }
    return encoded;
  }
  public decode(encodedData: Buffer): Record<any, any> {
    let decoded: Record<any, any>;
    // const encoded = new Uint8Array(
    //   encodedData.buffer,
    //   encodedData.byteOffset,
    //   encodedData.length
    // );
    switch (this.encoderType) {
      case EncoderType.MessagePack:
        decoded = decode(encodedData);
        break;
      case EncoderType.Json:
        decoded = JSON.parse(encodedData.toString());
        break;
    }
    return decoded;
  }
}
