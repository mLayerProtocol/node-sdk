require('dotenv').config();

import {
  Client,
  EntityType,
  EventFilterV2,
  Message,
  RPCProvider,
} from '../index';
import { RESTProvider } from '../index';
import { WSProvider } from '../index';
import { Events } from '../src/entities/event';
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

    const topicId = 'e79085e8-d048-ea5a-b97c-36b657f40a7c';
    await wsClient.subscribe<EventFilterV2>(
      {
        _v: 2,
        fs: [
          {
            snet: '15ee1c23-115d-9b6f-c005-db154b42781c',
            t: EntityType.Message,
            f: {
              top: topicId,
              s: 'did:0x59fD8f94dDd1Fe6066d300F74afD5E3a01970e43',
              snet: 'sdsd',
            },
          },
        ],
      },
      {
        onError: console.log,
        onReceive: async (msg) => {
          const event = Events.fromPayload(msg.event);
          if (
            msg.event.modelType == EntityType.Message &&
            msg.event.topic == topicId
          ) {
            const sentMessage = event.payload?.data; // if listening to
            console.log(
              Buffer.from(sentMessage.d, 'hex').toString(),
              new Date(),
              sentMessage
            ); // this is the message body
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
