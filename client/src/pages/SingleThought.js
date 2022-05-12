import React from 'react';
import { useParams } from 'react-router-dom';
import { QUERY_THOUGHT } from '../utils/queries';
import { useQuery } from '@apollo/client';
import ReactionList from '../components/ReactionList';

const SingleThought = props => {
  // gets this :id param in the App.js params
  const {id: thoughtId } = useParams();
  
  const { loading, data } = useQuery(QUERY_THOUGHT, {
    // this object is where you can put variables in your query
    // id will become $id in GraphQl and be set to thoughtId
    variables: { id: thoughtId }
  });

  const thought = data?.thought || {};

  if(loading) {
    return <div>Loading...</div>
  }
  return (
    <div>
      <div className="card mb-3">
        <p className="card-header">
          <span style={{ fontWeight: 700 }} className="text-light">
            {thought.username}
          </span>{' '}
          thought on {thought.createdAt}
        </p>
        <div className="card-body">
          <p>{thought.thoughtText}</p>
        </div>
      </div>
      {thought.reactionCount > 0 && <ReactionList reactions={thought.reactions} />}
    </div>
  );
};

export default SingleThought;