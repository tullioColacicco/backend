const { ApolloServer, PubSub } = require("apollo-server");
const gql = require("graphql-tag");
const mongoose = require("mongoose");

const typeDefs = require("./GraphQl/typeDef");
const resolvers = require("./GraphQl/resolvers");
const { MONGODB } = require("./config");

const pubsub = new PubSub();
const server = new ApolloServer({
  typeDefs,
  resolvers,

  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(MONGODB, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => {
    console.log("Db connected");
    return server.listen({ port: 5000 });
  })
  .then(({ url, subscriptionsUrl }) => {
    console.log(`🚀 Server ready at ${url}`);
    console.log(`🚀 Subscriptions ready at ${subscriptionsUrl}`);
  });
