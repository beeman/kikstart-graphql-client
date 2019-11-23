// Based on code from https://github.com/graphql-in-depth/graphcurl
import { inspect } from 'util';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { WebSocketLink } from 'apollo-link-ws';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import ws from 'ws';
import fetch from 'node-fetch';

/* istanbul ignore next */
const getErrorMessage = ({ graphQLErrors, networkError, operation }) =>
  `GraphQL Error${
    networkError && networkError.statusCode
      ? ` (${networkError.statusCode}): `
      : ': '
  }${networkError && networkError.message.replace(/\.$/, '')}${
    graphQLErrors && graphQLErrors.length
      ? `:\n${graphQLErrors.map(({ message }) => message).join('\n')}`
      : ''
  }${operation ? `\n@ ${operation.operationName}` : ''}${
    operation && operation.variables ? `(${inspect(operation.variables)})` : ''
  }`;

export interface KikstartGraphQLClientConfig {
  uri: string;
  wsUri: string;
  wsOptions?: any;
  cache?: any;
  headers?: any;
  log?: any;
  mutationLink?: 'http' | 'ws';
  queryLink?: 'http' | 'ws';
  subscriptionLink?: 'ws';
}

export const createLink = ({
  uri,
  wsUri,
  wsOptions,
  mutationLink,
  queryLink,
  subscriptionLink,
}: KikstartGraphQLClientConfig) => {
  // Define which operations use webSocket
  const wsOperations: string[] = [];

  if (mutationLink === 'ws') {
    wsOperations.push('mutation');
  }

  if (queryLink === 'ws') {
    wsOperations.push('query');
  }

  if (subscriptionLink === 'ws') {
    wsOperations.push('subscription');
  }

  // Create transport link
  const httpLink = createHttpLink({ uri, fetch });

  const wsClient = new SubscriptionClient(
    wsUri,
    {
      ...wsOptions,
      reconnect: true,
    },
    ws,
  );
  const wsLink = new WebSocketLink(wsClient);

  return wsOperations.length
    ? ApolloLink.split(
        ({ query }) =>
          (({ kind, operation }: any) =>
            kind === 'OperationDefinition' && wsOperations.includes(operation))(
            getMainDefinition(query),
          ),
        wsLink,
        httpLink,
      )
    : httpLink;
};

export const createClient = ({
  uri,
  wsUri,
  wsOptions,
  mutationLink = 'http',
  queryLink = 'http',
  subscriptionLink = 'ws',
  cache,
  headers,
  log,
}: KikstartGraphQLClientConfig) => {
  const transportLink = createLink({
    uri,
    wsUri,
    wsOptions,
    mutationLink,
    queryLink,
    subscriptionLink,
  });

  // Compose links
  const link = ApolloLink.from([
    onError((error: any) => (log || console).error(getErrorMessage(error))),
    ...(headers && Object.keys(headers).length
      ? [
          setContext((_request, context) => ({
            headers: { ...context.headers, ...headers },
          })),
        ]
      : []),
    transportLink,
  ]);

  if (log)
    log.log(
      `Connecting to ${uri}${wsUri ? ` with subscriptions at ${wsUri}` : ''}`,
      ...(headers && Object.keys(headers).length ? [headers] : []),
    );

  return new ApolloClient({ cache: cache || new InMemoryCache(), link });
};
