# kikstart-graphql-client

Small NodeJS Wrapper around apollo-client that provides easy access to running queries, mutations and subscriptions. 


![GitHub code size in bytes](https://img.shields.io/github/languages/code-size/beeman/kikstart-graphql-client.svg)
![GitHub repo size](https://img.shields.io/github/repo-size/beeman/kikstart-graphql-client.svg)
![npm](https://img.shields.io/npm/dw/kikstart-graphql-client.svg)
![npm](https://img.shields.io/npm/dm/kikstart-graphql-client.svg)
![npm](https://img.shields.io/npm/dy/kikstart-graphql-client.svg)
![npm](https://img.shields.io/npm/dt/kikstart-graphql-client.svg)
![NPM](https://img.shields.io/npm/l/kikstart-graphql-client.svg)
![npm](https://img.shields.io/npm/v/kikstart-graphql-client.svg)
![GitHub last commit](https://img.shields.io/github/last-commit/beeman/kikstart-graphql-client.svg)
![npm collaborators](https://img.shields.io/npm/collaborators/kikstart-graphql-client.svg)


## Usage

Install dependency:

```shell script
yarn add kikstart-graphql-client graphql
```

Import `GraphQLClient`:

```typescript
import { GraphQLClient } from 'kikstart-graphql-client';
```

Create instance:

```typescript
const client = new GraphQLClient({
  uri: 'http://localhost:4000/graphql',
  wsUri: 'ws://localhost:4000/graphql',
})
```

Run Query:

```typescript
async getStatus() {
  const { data, error } = await this.client.runQuery(`
    query { status }
  `);
  if (error) {
    throw error
  }
  return data.status
}
```

Run Subscription:

```typescript
client.runSubscription(query)
   .subscribe({
      next: res => console.log(JSON.stringify(res.data.statusSubscription, null, 2)),
      error: error => console.error(error),
      complete: () => console.log('done'),
   })
}
```



## Credits
- Uses code from [graphcurl](https://github.com/graphql-in-depth/graphcurl).
- Based on [npm-typescript-package-boilerplate](https://github.com/93v/npm-typescript-package-boilerplate)

## MIT License
