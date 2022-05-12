import React from 'react';
// Allows us to make requrest to the GraphQL server we connected to and made available with ApolloProvider
import { useQuery } from '@apollo/client';
import ThoughtList from '../components/ThoughtList';
import { QUERY_THOUGHTS, QUERY_ME_BASIC } from '../utils/queries';
import Auth from '../utils/auth';
import FriendList from '../components/FriendList';

const Home = () => {
  // use useQuery hook to maek a query request
  // Has a loading since it's async and changes when its done and the data returned is in the data variable
  const { loading, data } = useQuery(QUERY_THOUGHTS);
  // use object destructuring to extract data from the search and rename it 'userData'
  const { data: userData } = useQuery(QUERY_ME_BASIC); 

  // New optional chaining from JS
  // Says: 'if data exists, store in the thoughts constant, if not, then save an empty array into thoughts
  const thoughts = data?.thoughts || [];

  // checked if they are loggedIN
  const loggedIn = Auth.loggedIn();
  return (
    <main>
      <div className='flex-row justify-space-between'>
        <div className={`col-12 mb-3 ${loggedIn && 'col-lg-8'}`}>
          {loading ? (
            <div>Loading...</div>
          ): (
            <ThoughtList thoughts={thoughts} title='Some Feed for Thought(s)...'/>
          )
          }
        </div>
        {loggedIn && userData ? (
          <div className='col-12 col-lg-3 mb-3'>
            <FriendList 
              username={userData.me.username}
              friendCount={userData.me.friendCount}
              friends={userData.me.friends}
            />
          </div>
        ) : null}
      </div>
    </main>
  );
};

export default Home;
