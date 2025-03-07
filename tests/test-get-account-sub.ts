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
import { Client, RESTProvider } from "../src";
import { validator, account, agent, agentList } from "./lib/keys";
import { Topic } from "../src/entities/topic";
import { Subscription } from "../src/entities/subscription";
import { Address } from "../src/entities";

// console.log(Utils.generateKeyPairEdd());

// const owner = {
//   privateKey:
//     '524324bf5d8d62add5b5980a4fded961bd72fd69469bb36a4aaf1f2c7ec8dc39',
//   publicKey:
//     '02ebec9d95769bb3d71712f0bf1e7e88b199fc945f67f908bbab81e9b7cb1092d8',
//   address: 'ml:12htc66jeelcfm4nv7drk4dqz6umntcfe690725',
// };

async function main() {
  // const subscribe: Subscription = new Subscription();

  // const payload: ClientPayload<Subscription> = new ClientPayload();
  // payload.data = subscribe;
  // payload.timestamp = 2705392177908;
  // payload.eventType = MemberTopicEventType.JoinEvent;
  // payload.validator = validator.publicKey;
  // payload.account = Address.fromString(agentList[0].account.address);
  // const pb = payload.encodeBytes();
  // console.log("🚀 ~ main ~ pb:", pb.toString("hex"));
  // payload.signature = await Utils.signMessageEcc(pb, agentList[0].privateKey);
  // console.log("Payload", JSON.stringify(payload.asPayload()));

  const client = new Client(new RESTProvider("http://localhost:9531"));
  console.log(
    "AUTHORIZE",
    await client.getAccountSubscriptions({
      params: {
        // acct: agentList[0].account.address,
        acct: "did:cosmos1vxm0v5dm9hacm3mznvx852fmtu6792wpa4wgqx",
      },
    })
  );
}
main().then();
