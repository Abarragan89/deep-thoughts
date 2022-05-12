// React Router 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// ApolloProvider - react component that provides data to other components
// ApolloClient - constructor function that initializes the connection to the graphQL API server
// InMemoryCache - lets ApolloClient cache API response data so that we can perform requests more efficiently
// createHttpLnk - gives control to how ApolloClient makes Request. middleware for outbound network requests.
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';

import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
// Page components
import Login from './pages/Login';
import NoMatch from './pages/NoMatch';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
import Signup from './pages/Signup';


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
      <Router>
        <div className='flex-column justify-flex-start min-100-vh'>
            <Header />
            <div className='container'>
            <Routes>
              <Route 
                path='/'
                element={<Home />}
              />
              <Route 
              // when the path is /login, the Login component will render
                path='/login'
                element={<Login />}
              />
              <Route 
                path="/signup"
                element={<Signup />}
              />
              <Route 
                path='/profile/:username?'
                element={<Profile />}
              />
              <Route 
                path='/thought/:id'
                element={<SingleThought />}
              />
              <Route 
                path='*'
                element={<NoMatch />}
              />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
