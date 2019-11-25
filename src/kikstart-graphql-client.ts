import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import {
  createClient,
  KikstartGraphQLClientConfig,
} from './kikstart-apollo-client';

import { WebSocketLink } from 'apollo-link-ws';
import { createHttpLink } from 'apollo-link-http';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { ApolloLink } from 'apollo-link';
import ws from 'ws';
import fetch from 'node-fetch';
import { InMemoryCache } from 'apollo-cache-inmemory';

export class GraphQLClient {
  public apollo: ApolloClient<InMemoryCache | any>;
  public httpLink: ApolloLink;
  public wsClient: SubscriptionClient;
  public wsLink: WebSocketLink;

  constructor(private config: KikstartGraphQLClientConfig) {
    this.httpLink = createHttpLink({ uri: config.uri, fetch });
    this.wsClient = new SubscriptionClient(
      config.wsUri,
      {
        ...config.wsOptions,
        reconnect: true,
      },
      ws,
    );
    this.wsLink = new WebSocketLink(this.wsClient);
    this.apollo = createClient(this.httpLink, this.wsLink, this.config);
  }

  query(query) {
    return typeof query === 'string' ? gql(query) : query;
  }

  async runQuery(query, variables = {}) {
    return this.apollo.query({ query: this.query(query), variables });
  }

  async runMutation(mutation, variables = {}) {
    return this.apollo.mutate({ mutation: this.query(mutation), variables });
  }

  runSubscription(query, variables = {}) {
    return this.apollo.subscribe({ query: this.query(query), variables });
  }

  disconnect() {
    if (this.config.log) {
      this.config.log.log(
        `[GraphQLClient] Disconnecting from ${this.config.uri} / ${this.config.wsUri}`,
      );
    }

    this.wsClient.close();
  }
}
