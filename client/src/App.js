// ApolloProvider - react component that provides data to other components
// ApolloClient - constructor function that initializes the connection to the graphQL API server
// InMemoryCache - lets ApolloClient cache API response data so that we can perform requests more efficiently
// createHttpLnk - gives control to how ApolloClient makes Request. middleware for outbound network requests.
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App() {
  return (
    //Since the apollo provider tags have the 'client' as variable, the whole app will have access to the server's API data. 
    <ApolloProvider client={client}>
      <div className='flex-column justify-flex-start min-100-vh'>
        <Header />
        <div className='container'>
          <Home />
        </div>
        <Footer />
      </div>
    </ApolloProvider>
  );
}

export default App;
