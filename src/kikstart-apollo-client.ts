// Based on code from https://github.com/graphql-in-depth/graphcurl
import { inspect } from 'util';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

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

export interface KikstartGraphQLLinkConfig {
  mutationLink?: 'http' | 'ws';
  queryLink?: 'http' | 'ws';
  subscriptionLink?: 'ws';
}
export interface KikstartGraphQLClientConfig extends KikstartGraphQLLinkConfig {
  uri: string;
  wsUri: string;
  wsOptions?: any;
  cache?: any;
  headers?: any;
  log?: any;
}

export const createLink = (
  httpLink,
  wsLink,
  { mutationLink, queryLink, subscriptionLink }: KikstartGraphQLLinkConfig,
) => {
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

export const createClient = (
  httpLink,
  wsLink,
  {
    uri,
    wsUri,
    mutationLink = 'http',
    queryLink = 'http',
    subscriptionLink = 'ws',
    cache,
    headers,
    log,
  }: KikstartGraphQLClientConfig,
) => {
  const transportLink = createLink(httpLink, wsLink, {
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
