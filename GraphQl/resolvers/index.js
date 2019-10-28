const postResolvers = require("./Posts");
const userResolvers = require("./Users");
const commentResolvers = require("./Comments");

module.exports = {
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation
  }
};
