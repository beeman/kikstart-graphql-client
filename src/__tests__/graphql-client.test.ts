import { GraphQLClient, KikstartGraphQLClientConfig } from '..';
const uri = process.env.GRAPHQL_CLIENT_URI || 'http://localhost:4567';
const wsUri = process.env.GRAPHQL_CLIENT_WSURI || 'ws://localhost:4567';

const queries = {
  uptimeQuery: `
    query { uptime } 
  `,
  publishMutation: `
    mutation {
      publish(message: { type: "A", scope: "B", payload: "C" }) {
        type
        scope
        payload
      }
    }
  `,
  intercomSubscription: `
  subscription {
    intercom {
      type
      scope
      payload
    }
  }
`,
};

const getClient = (config?: KikstartGraphQLClientConfig) => {
  return new GraphQLClient({
    uri,
    wsUri,
    ...config,
  });
};

test('GraphQLClient', () => {
  const client = getClient();
  expect(client).toBeDefined();
  client.disconnect();
});

test('GraphQLClient query', async () => {
  const client = getClient();
  const { data } = await client.runQuery(queries.uptimeQuery);
  expect(data.uptime).toBeDefined();
  client.disconnect();
});

test('GraphQLClient mutation', async () => {
  const client = getClient();
  const { data } = await client.runMutation(queries.publishMutation);
  expect(data.publish).toBeDefined();
  client.disconnect();
});

test('GraphQLClient subscription', async () => {
  const client = getClient();
  client.runSubscription(queries.intercomSubscription).subscribe((res) => {
    expect(res.data.intercom).toBeDefined();
  });
  const pub = await client.runMutation(queries.publishMutation);
  expect(pub.data.publish).toBeDefined();
  client.disconnect();
});

test('GraphQLClient all transport over webSocket', async () => {
  const client = getClient({
    uri,
    wsUri,
    queryLink: 'ws',
    mutationLink: 'ws',
  });
  client.runSubscription(queries.intercomSubscription).subscribe((res) => {
    expect(res.data.intercom).toBeDefined();
  });
  const pub = await client.runMutation(queries.publishMutation);
  expect(pub.data.publish).toBeDefined();
  client.disconnect();
});
