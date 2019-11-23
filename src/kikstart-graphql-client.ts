import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import {
  createClient,
  KikstartGraphQLClientConfig,
} from './kikstart-apollo-client';

export class GraphQLClient {
  private client: ApolloClient<any>;

  constructor(private config: KikstartGraphQLClientConfig) {
    this.client = createClient(this.config);
  }

  query(query) {
    return typeof query === 'string' ? gql(query) : query;
  }

  async runQuery(query, variables = {}) {
    const { error, data } = await this.client
      .query({ query: this.query(query), variables })
      .catch((err) => {
        return err;
      });

    return { error, data };
  }

  async runMutation(mutation, variables = {}) {
    const { error, data } = await this.client
      .mutate({ mutation: this.query(mutation), variables })
      .catch((err) => {
        return err;
      });

    return { error, data };
  }

  runSubscription(query, variables = {}) {
    return this.client.subscribe({ query: this.query(query), variables });
  }
}
