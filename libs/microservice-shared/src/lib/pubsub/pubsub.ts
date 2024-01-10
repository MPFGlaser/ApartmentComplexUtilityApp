import { Message, PubSub } from '@google-cloud/pubsub';
import { MessageTopic } from './topics.enum';

const projectId =
  process.env['NODE_ENV'] === 'production' ? 'mpfg-acua' : 'mpfg-acua-dev';

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
    await topic.create();
    console.log(`Topic ${topicName} created.`);
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
