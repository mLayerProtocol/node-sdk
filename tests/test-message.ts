require("dotenv").config();
const jayson = require("jayson");
import { Utils } from "../src/helper";
import { Authorization } from "../src/entities/authorization";
import {
  AuthorizeEventType,
  ClientPayload,
  MemberMessageEventType,
} from "../src/entities/clientPayload";
import { Client } from '../src';
import { validator, account, agent, agentList } from './lib/keys';
import { Address } from '../src/entities/address';
import {
  IMessageAction,
  Message,
  MessageAction,
} from '../src/entities/message';
import { DataType } from '../src/constants';
import { RESTProvider } from '../src/providers';
import { ChainId } from '../src/entities';

// console.log(Utils.generateKeyPairEdd());

// const owner = {
//   privateKey:
//     '524324bf5d8d62add5b5980a4fded961bd72fd69469bb36a4aaf1f2c7ec8dc39',
//   publicKey:
//     '02ebec9d95769bb3d71712f0bf1e7e88b199fc945f67f908bbab81e9b7cb1092d8',
//   address: 'ml:12htc66jeelcfm4nv7drk4dqz6umntcfe690725',
// };

async function main() {
  const message: Message = new Message();
  const messageAction = new MessageAction();
  const messageActions = [];
  const messagettachments = [];

  messageAction.contract = '';
  messageAction.abi = '';
  messageAction.action = '';
  messageAction.parameters = [''];

  message.topic = 'a4d5937f-c572-64ff-3d9a-dbbc086456bf';
  message.sender = Address.fromString(agentList[0].account.address);
  message.data = Buffer.from(
    'Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World, Hello World,'
  );
  // message.data = Buffer.from('Hello World');
  message.actions = messageActions;
  message.dataType = DataType.JSON;
  message.nonce = Date.now();

  const payload: ClientPayload<Message> = new ClientPayload();
  payload.data = message;
  payload.subnet = 'd22453f8-63ac-3154-6d0f-43dc44687df7';
  payload.chainId = new ChainId('84532');
  payload.eventType = MemberMessageEventType.SendMessageEvent;
  payload.validator = validator.address;
  payload.account = Address.fromString(agentList[0].account.address);
  payload.nonce = 0;

  // console.log('HEXDATA', pb.toString('hex'));
  // payload.signature = Utils.signMessageEcc(pb, agentList[0].privateKey);
  console.log('Payload', JSON.stringify(payload.asPayload()));

  const client = new Client(new RESTProvider('http://localhost:8080'));
  const amount = 1000;
  for (let i = 0; i < amount; i++) {
    // const resp = await client.createMessage(payload).catch((err) => {
    //   console.log('err', err);
    //   return err;
    // });

    const g = payload;
    g.data.nonce += i;
    g.nonce += i;
    const pbg = g.encodeBytes();
    g.signature = Utils.signMessageEcc(pbg, agentList[0].privateKey);
    console.log('Signature', g.signature);
    client
      .createMessage(g)
      .then((resp: any) => console.log('Message', resp.data.id))
      .catch((err) => {
        console.log('err', err);
        return err;
      });
  }
}
main().then();
