require("dotenv").config();
const jayson = require("jayson");
import { Utils } from "../src/helper";
import { Authorization } from "../src/entities/authorization";
import {
  AdminApplicationEventType,
  // AdminApplicationEventType,
  AuthorizeEventType,
  ClientPayload,
} from '../src/entities/clientPayload';
import { Client, RESTProvider } from '../src';
import { validator, account, agent, agentList } from './lib/keys';
import { Address } from '../src/entities/address';
import { Application } from '../src/entities/subNetwork';

// console.log(Utils.generateKeyPairEdd());

// const owner = {
//   privateKey:
//     '524324bf5d8d62add5b5980a4fded961bd72fd69469bb36a4aaf1f2c7ec8dc39',
//   publicKey:
//     '02ebec9d95769bb3d71712f0bf1e7e88b199fc945f67f908bbab81e9b7cb1092d8',
//   address: 'ml:12htc66jeelcfm4nv7drk4dqz6umntcfe690725',
// };

async function main() {
  const subNetwork: Application = new Application();
  //console.log('keypairsss', Utils.generateKeyPairSecp());
  // console.log(
  //   'BECH32ADDRESS',
  //   validator.publicKey,
  //   Utils.toAddress(Buffer.from(validator.publicKey, 'hex'))
  // );

  subNetwork.meta = 'New Network';
  subNetwork.reference = 'a898978';
  subNetwork.owner = Address.fromString(agentList[0].account.address);

  const payload: ClientPayload<Application> = new ClientPayload();
  payload.data = subNetwork;
  payload.timestamp = 1705392178023;
  payload.eventType = AdminApplicationEventType.CreateApplication;
  payload.validator = validator.publicKey;
  payload.account = Address.fromString(agentList[0].account.address);
  payload.nonce = 0;
  const pb = payload.encodeBytes();
  console.log('HEXDATA', pb.toString('hex'));
  payload.signature = await Utils.signMessageEcc(pb, agentList[0].privateKey);
  console.log('Payload', JSON.stringify(payload.asPayload()));

  const client = new Client(new RESTProvider('http://localhost:9531'));
  console.log('AUTHORIZE', await client.createApplication(payload));
}
main().then();
