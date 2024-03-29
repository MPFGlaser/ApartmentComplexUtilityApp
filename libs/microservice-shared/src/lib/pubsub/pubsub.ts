import { Message, PubSub } from '@google-cloud/pubsub';
import { MessageTopic } from './topics.enum';

let projectId = 'mpfg-acua';

if (process.env['NODE_ENV'] !== 'production') {
  process.env['PUBSUB_EMULATOR_HOST'] = 'localhost:8085';
  projectId = 'mpfg-acua-dev';
}

const pubsub = new PubSub({ projectId });

/**
 * Get a topic by name. Will create topic if it doesn't exist.
 * Can be used to create a topic if it doesn't exist.
 * @example const topic = await getTopic('delete-user-data');
 * @param topicName Name of the topic to get.
 * @returns
 */
export async function getTopic(topicName: string) {
  const topic = pubsub.topic(topicName);
  const [exists] = await topic.exists();
  if (!exists) {
    try {
      await topic.create();
      console.log(`Topic ${topicName} created.`);
    } catch (error) {
      if ((error as { code: number }).code !== 6) {
        // 6 is the error code for 'ALREADY_EXISTS'
        throw error;
      }
      console.log(`Topic ${topicName} already exists.`);
    }
  }
  return topic;
}

/**
 *
 * @example initializeSubscriber('delete-user-data', 'ticket-service-delete-user-data', (message) => handleMessage(message)
 * @param topicName Name of the topic to subscribe to
 * @param subscriptionName Name of the subscription to create
 * @param messageHandler Callback function to handle incoming messages
 */
export async function initializeSubscriber(
  topicName: string,
  subscriptionName: string,
  messageHandler: (message: Message) => void
) {
  const topic = await getTopic(topicName);
  const [subscriptions] = await topic.getSubscriptions();
  let subscription = subscriptions.find((sub) =>
    sub.name.endsWith(subscriptionName)
  );

  if (!subscription) {
    [subscription] = await topic.createSubscription(subscriptionName);
    console.log(`Subscription ${subscriptionName} created.`);
  }

  subscription.on('message', messageHandler);

  subscription.on('error', (error) => {
    console.error(error);
  });
}

/**
 * @example const subscriptionName = generateSubscriptionName(MessageTopic.DeleteUserData, 'ticket-service');
 * @param topicName topic name to generate a subscription name for
 * @param service service name to generate a subscription name for
 * @returns a subscription name, combining the service name and topic name
 */
export function generateSubscriptionName(
  topicName: MessageTopic,
  service: string
): string {
  // start from the last /
  const lastSlash = topicName.lastIndexOf('/');
  // get the topic name without the /
  const topicShortName = topicName.substring(lastSlash + 1);
  return `${topicShortName}-${service}`;
}
