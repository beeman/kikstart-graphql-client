// Based on code from https://github.com/graphql-in-depth/graphcurl
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { getMainDefinition } from 'apollo-utilities';

export interface KikstartGraphQLLinkConfig {
  mutationLink?: 'http' | 'ws';
  queryLink?: 'http' | 'ws';
  subscriptionLink?: 'ws';
}
export interface KikstartGraphQLClientConfig extends KikstartGraphQLLinkConfig {
  url: string;
  wsUrl?: string;
  wsOptions?: any;
  cache?: any;
  headers?: any;
  log?: any;
  // DEPRECATED to be removed in an upcoming major release
  uri?: string;
  wsUri?: string;
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
    url,
    wsUrl,
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
    onError((error: any) => (log || console).error(error)),
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
      `[GraphQLClient] Connecting to ${url} / ${wsUrl}`,
      ...(headers && Object.keys(headers).length ? [headers] : []),
    );

  return new ApolloClient({ cache: cache || new InMemoryCache(), link });
};
