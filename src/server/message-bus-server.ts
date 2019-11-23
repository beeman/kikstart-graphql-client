/* istanbul ignore file */
import { GraphQLServer, PubSub, withFilter } from 'graphql-yoga';

export const pubsub = new PubSub();

const MESSAGE_TRIGGER = 'MESSAGE_BUS_TRIGGER';
const SUBSCRIPTION_NAME = 'intercom';

const typeDefs = `
  scalar JSON
    type Query {
      uptime: Float
    }
    input PublishInput {
        type: String!
        scope: String
        payload: JSON
    }
    input SubscribeInput  {
        type: String
        scope: String
    }
    type MessagePayload {
        type: String!
        scope: String
        payload: JSON
    }
    type Mutation {
        publish(message: PublishInput): MessagePayload
    }
    type Subscription {
        ${SUBSCRIPTION_NAME}(filter: SubscribeInput): MessagePayload
    }
`;
const resolvers = {
  Query: {
    uptime: () => process.uptime(),
  },
  Mutation: {
    publish(_, args: any) {
      pubsub.publish(MESSAGE_TRIGGER, { [SUBSCRIPTION_NAME]: args.message });
      return args.message;
    },
  },
  Subscription: {
    [SUBSCRIPTION_NAME]: {
      subscribe: withFilter(
        () => pubsub.asyncIterator(MESSAGE_TRIGGER),
        (payload, variables) => {
          // No filters
          if (!payload || !payload[SUBSCRIPTION_NAME] || !variables.filter) {
            return true;
          }

          const { type, scope } = variables.filter;

          const hasType = type && payload[SUBSCRIPTION_NAME].type === type;
          const hasScope = scope && payload[SUBSCRIPTION_NAME].scope === scope;

          // type AND scope
          if (type && scope) {
            return hasType && hasScope;
          }

          if (!type && scope) {
            return hasScope;
          }

          if (type && !scope) {
            return hasType;
          }

          return true;
        },
      ),
    },
  },
};

export const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

const port = process.env.PORT || 4567;

server.start({ port }).then(() => {
  console.log(`🚀 Listening on http://localhost:${port} `);
});
