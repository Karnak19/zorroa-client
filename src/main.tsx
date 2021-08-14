import React from 'react';
import ReactDOM from 'react-dom';

import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import 'tailwindcss/tailwind.css';

import App from './components/App';
import { MagicProvider } from './context/magic';

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('MAGIC_TOKEN');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
}).concat(
  createHttpLink({
    uri: 'http://localhost:5000/graphql',
  }),
);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <MagicProvider>
        <App />
      </MagicProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
