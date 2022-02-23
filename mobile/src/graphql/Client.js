import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {HttpLink} from 'apollo-link-http';
import fetch from 'unfetch';
const link = new HttpLink({
  uri: `http://localhost:4000/`,
  // headers: {
  //   Authorization: `Bearer ${token}`
  // }
  fetch,
});

const cache = new InMemoryCache();

export const client = new ApolloClient({
  link,
  cache,
});
