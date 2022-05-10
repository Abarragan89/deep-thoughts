const express = require('express');
// import Apolloserver
const { ApolloServer } = require('apollo-server-express');

// middleware
const { authMiddleware } = require('./utils/auth');

// import our typeDefs and resolvers
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
// create a new Apollo server and pass in our schema data
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // ensures every requrest performs an authentication check and the updated request object will be passed to the rexolvers as the context
  context: authMiddleware
});

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// create a new instance of an Apollo servver with GraphQl schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  // integrate our Apollo server with the Express application as middleware
  server.applyMiddleware({ app });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      // log where we can go test our GQL API
      console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`)
    });
  });
};

// Call the async function to start the server
startApolloServer(typeDefs, resolvers);

