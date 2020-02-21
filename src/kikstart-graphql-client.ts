import ApolloClient, { ApolloQueryResult } from 'apollo-client';
import gql from 'graphql-tag';

import {
  createClient,
  KikstartGraphQLClientConfig,
} from './kikstart-apollo-client';

import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ApolloLink, FetchResult, Observable } from 'apollo-link';
import ws from 'ws';
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';

export class GraphQLClient {
  public apollo: ApolloClient<InMemoryCache | any>;
  public httpLink: ApolloLink;
  public wsClient: SubscriptionClient;
  public wsLink: WebSocketLink;

  constructor(public config: KikstartGraphQLClientConfig) {
    if (config.uri) {
      console.warn('Deprecated config parameter: uri, please use url instead.');
      config.url = config.uri;
    }
    if (config.wsUri) {
      console.warn(
        'Deprecated config parameter: wsUri, please use wsUrl instead.',
      );
      config.wsUrl = config.wsUri;
    }
    config.wsUrl =
      config.wsUrl ||
      config.url.replace('https://', 'wss://').replace('http://', 'ws://');
    this.httpLink = createHttpLink({ uri: config.url, fetch });
    this.wsClient = new SubscriptionClient(
      config.wsUrl,
      {
        ...config.wsOptions,
        connectionParams: config.connectionParams,
        reconnect: true,
      },
      ws,
    );
    this.wsLink = new WebSocketLink(this.wsClient);
    this.apollo = createClient(this.httpLink, this.wsLink, this.config);
  }

  private query(query) {
    return typeof query === 'string' ? gql(query) : query;
  }

  public async runQuery(
    query,
    variables = {},
  ): Promise<ApolloQueryResult<any>> {
    return this.apollo.query({ query: this.query(query), variables });
  }

  public async runMutation(mutation, variables = {}): Promise<FetchResult> {
    return this.apollo.mutate({ mutation: this.query(mutation), variables });
  }

  public runSubscription(query, variables = {}): Observable<FetchResult<any>> {
    return this.apollo.subscribe({ query: this.query(query), variables });
  }

  public disconnect() {
    if (this.config.log) {
      this.config.log.log(
        `[GraphQLClient] Disconnecting from ${this.config.url} / ${this.config.wsUrl}`,
      );
    }

    this.wsClient.close();
  }
}
