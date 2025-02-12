require("dotenv").config();
const jayson = require("jayson");
import { Utils } from "../src/helper";
import { Authorization } from "../src/entities/authorization";
import {
  AdminTopicEventType,
  AuthorizeEventType,
  ClientPayload,
  MemberTopicEventType,
} from "../src/entities/clientPayload";
import { Client } from "../src";
import { validator, account, agent, agentList } from "./lib/keys";
import { Topic } from "../src/entities/topic";
import {
  Subscription,
  SubscriberRole,
  SubscriptionStatus,
} from '../src/entities/subscription';
import { Address, ChainId } from '../src/entities';
import { RESTProvider } from '../src/providers';

// console.log(Utils.generateKeyPairEdd());

// const owner = {
//   privateKey:
//     '524324bf5d8d62add5b5980a4fded961bd72fd69469bb36a4aaf1f2c7ec8dc39',
//   publicKey:
//     '02ebec9d95769bb3d71712f0bf1e7e88b199fc945f67f908bbab81e9b7cb1092d8',
//   address: 'ml:12htc66jeelcfm4nv7drk4dqz6umntcfe690725',
// };

async function main() {
  const subscribe: Subscription = new Subscription();
  //console.log('keypairsss', Utils.generateKeyPairSecp());
  // console.log(
  //   'BECH32ADDRESS',
  //   validator.publicKey,
  //   Utils.toAddress(Buffer.from(validator.publicKey, 'hex'))
  // );
  // subscribe.status = 1;
  subscribe.topic = '746f7069-0000-0000-0000-000000000000';
  subscribe.subscriber = Address.fromString(
    '0x59fD8f94dDd1Fe6066d300F74afD5E3a01970e43'
  );
  subscribe.status = SubscriptionStatus.Subscribed;
  subscribe.role = SubscriberRole.Writer;
  subscribe.ref = 'com.ref.com/sub1';
  subscribe.subnet = '534e4554-0000-0000-0000-000000000000';

  //   subscribe.agent = "Bitcoin world";
  //   subscribe.reference = "898989";

  const payload: ClientPayload<Subscription> = new ClientPayload();
  payload.data = subscribe;
  payload.subnet = '534e4554-0000-0000-0000-000000000000';
  payload.timestamp = 2705392177908;
  payload.eventType = MemberTopicEventType.SubscribeEvent;
  payload.validator = validator.address;
  payload.chainId = new ChainId('84532');
  payload.account = Address.fromString(
    '0x59fD8f94dDd1Fe6066d300F74afD5E3a01970e43'
  );
  const pb = payload.encodeBytes();
  console.log('🚀 ~ main ~ pb:', pb.toString('hex'));
  payload.signature = await Utils.signMessageEcc(pb, agentList[0].privateKey);
  console.log(
    'Payload',
    JSON.stringify(payload.asPayload(), function (k, v) {
      return v === '' ? undefined : v;
    })
  );

  const client = new Client(new RESTProvider('http://localhost:8080'));
  try {
    console.log(await client.createSubscription(payload));
  } catch (e) {
    console.log('Subscribe Error', e);
  }
}
main().then();
