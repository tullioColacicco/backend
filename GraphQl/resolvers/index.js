const postResolvers = require("./Posts");
const userResolvers = require("./Users");
const commentResolvers = require("./Comments");
const chatResolvers = require("./Chat");
const uploadResolvers = require("./Upload");
const profileDescriptionResolvers = require("./ProfileDescription");

module.exports = {
  Post: {
    likeCount: parent => parent.likes.length,
    commentCount: parent => parent.comments.length
  },
  // Chat: {
  //   messageLength: parent => parent.messages.length
  //   // commentCount: parent => parent.comments.length
  // },
  Query: {
    ...postResolvers.Query
  },
  Mutation: {
    ...userResolvers.Mutation,
    ...postResolvers.Mutation,
    ...commentResolvers.Mutation,
    ...chatResolvers.Mutation,
    ...uploadResolvers.Mutation,
    ...profileDescriptionResolvers.Mutation
  },
  Subscription: {
    ...chatResolvers.Subscription
  }
};
