require('dotenv').config();
const jayson = require('jayson');
import { Utils } from '../src/helper';
import { Authorization } from '../src/entities/authorization';
import {
  AuthorizeEventType,
  ClientPayload,
  MemberMessageEventType,
} from '../src/entities/clientPayload';
import { Client } from '../src';
import { validator, account, agent, agentList } from './lib/keys';
import { Address } from '../src/entities/address';
import {
  DataAction,
  IMessageAction,
  Message,
  MessageAction,
} from '../src/entities/message';
import { DataType } from '../src/constants';
import { RESTProvider } from '../src/providers';
import {
  AdminAuthority,
  ChainId,
  EntityType,
  RegistryEntity,
} from '../src/entities';
import { DataEncoder, EncoderType } from '../src/encoder';
import {
  CapabilityTypes,
  EntityCapability,
} from '../src/entities/capabilities';
import { AutomationCapabilities } from '../src/entities/capabilities/automation';
import { NLPCapabilities } from '../src/entities/capabilities/nlp';

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
  const account = '0x59fD8f94dDd1Fe6066d300F74afD5E3a01970e43';
  messageAction.contract = '';
  messageAction.abi = '';
  messageAction.action = '';
  messageAction.parameters = [''];

  message.topic = '746f7069-0000-0000-0000-000000000000';
  message.sender = Address.fromString(
    '0x59fD8f94dDd1Fe6066d300F74afD5E3a01970e43'
  );
  const externalId = '534e4554-0000-0000-0000-E0092a000000';
  const entity = new RegistryEntity(
    EntityType.AI,
    externalId,
    'AgentM',
    'AgentM helps boook flights and manages itinerary. Hi'
  );
  entity.adminAuthority = new AdminAuthority(
    externalId,
    Address.fromString(account).toAddressString(),
    Address.fromString(account).toAddressString()
  );
  const nlpCapability = new EntityCapability(
    CapabilityTypes.NLP,
    new NLPCapabilities()
  );

  entity.capabilities.push(nlpCapability);

  const dataEncoder = new DataEncoder(EncoderType.MessagePack);
  const encodedEntity = dataEncoder.encode(entity);
  message.data = dataEncoder.encode(
    new DataAction(1, dataEncoder.encode(entity)).toPayload()
  );
  console.log('ENCODED', dataEncoder.decode(dataEncoder.encode(entity)));
  // message.data = Buffer.from('Hello World');
  message.actions = messageActions;
  message.dataType = DataType.JSON;
  message.nonce = Date.now();

  const payload: ClientPayload<Message> = new ClientPayload();
  payload.data = message;
  payload.subnet = '534e4554-0000-0000-0000-000000000000';
  payload.chainId = new ChainId('84532');
  payload.eventType = MemberMessageEventType.SendMessageEvent;
  payload.validator = validator.address;
  payload.account = Address.fromString(account);
  payload.nonce = 0;

  // console.log('HEXDATA', pb.toString('hex'));
  // payload.signature = Utils.signMessageEcc(pb, agentList[0].privateKey);
  console.log('Payload', JSON.stringify(payload.asPayload()));

  const client = new Client(new RESTProvider('http://localhost:8080'));
  const amount = 1;
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
      .then((resp: any) => console.log('Message', resp.data.sEs))
      .catch((err) => {
        console.log('err', err);
        return err;
      });
  }
}
main().then();
