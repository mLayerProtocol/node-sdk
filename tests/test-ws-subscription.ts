require("dotenv").config();

import { Client, Message, RPCProvider } from "../index";
import { RESTProvider } from "../index";
import { WSProvider } from "../index";
import { Events } from "../src/entities/event";
// import { WSProvider } from '../dist';

async function main() {
  // const client = new Client(new RESTProvider('http://localhost:9531'));
  // try {
  //   console.log(
  //     'AUTHORIZE-HTTP',
  //     await client.getNodeInfo({
  //       params: {},
  //     })
  //   );
  // } catch (e) {
  //   console.log('EEEEEE', e.message);
  // }
  // const wsClient = new Client(new WSProvider('ws://154.12.228.25:8088/ws'));
  const wsClient = new Client(new WSProvider('ws://localhost:9091/ws'));
  const connected = await wsClient.connect();

  if (connected) {
    console.log('connected!!!');
    // console.log(
    //   'BLOCKSTAT-WS',
    //   await wsClient.getNodeInfo({
    //     params: {},
    //   })
    // );

    const topicId = '9ec7d174-d9dd-7151-5295-f3751a20be9b';
    await wsClient.subscribe(
      {
        '15ee1c23-115d-9b6f-c005-db154b42781c': [
          // 'snet',
          // 'auth',
          // 'sub',
          // 'top',
          // 'msg',
          topicId,
        ],
      },
      {
        onError: console.log,
        onReceive: async (msg) => {
          const event = Events.fromPayload(msg.event);
          if (msg.event.modelType == 'msg' && msg.event.topic == topicId) {
            const sentMessage = (event.payload as any).d; // if listening to
            console.log(Buffer.from(sentMessage.d, 'hex').toString()); // this is the message body
          }
        },
        onSubscribe: (id) => console.log('SUBSCRIPTIONID', id),
      }
    );
  } else {
    console.log('Unable to connect');
  }
  await wsClient.subscribe;
}

main().then();
