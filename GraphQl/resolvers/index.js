const postResolvers = require("./Posts");
const userResolvers = require("./Users");
const commentResolvers = require("./Comments");

module.exports = {
  Post: {
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length
  },
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation
  }
};
