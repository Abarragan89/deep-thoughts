import React from 'react';
// Allows us to make requrest to the GraphQL server we connected to and made available with ApolloProvider
import { useQuery } from '@apollo/client';
import { QUERY_THOUGHTS } from '../utils/queries';
import ThoughtList from '../components/ThoughtList';

const Home = () => {
  // use useQuery hook to maek a query request
  // Has a loading since it's async and changes when its done and the data returned is in the data variable
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // New optional chaining from JS
  // Says: 'if data exists, store in the thoughts constant, if not, then save an empty array into thoughts
  const thoughts = data?.thoughts || [];
  console.log(thoughts);

  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className='col-12 mb-3'>
          {loading ? (
            <div>Loading...</div>
          ): (
            <ThoughtList thoughts={thoughts} title='Some Feed for Thought(s)...'/>
          )
          }
        </div>
      </div>
    </main>
  );
};

export default Home;
