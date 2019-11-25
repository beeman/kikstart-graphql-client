import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import {
  createClient,
  KikstartGraphQLClientConfig,
} from './kikstart-apollo-client';

export class GraphQLClient {
  public apollo: ApolloClient<any>;

  constructor(private config: KikstartGraphQLClientConfig) {
    this.apollo = createClient(this.config);
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
}
