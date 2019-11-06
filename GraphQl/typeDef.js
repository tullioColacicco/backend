const { gql } = require("apollo-server");

module.exports = gql`
  type Post {
    id: ID!
    body: String!
    createdAt: String!
    username: String!
    comments: [Comment]!
    likes: [Like]!
    likeCount: Int!
    commentCount: Int!
    user: User!
  }
  type Chat {
    id: ID!
    body: String!
    createdAt: String!
    username: String!

    users: [User]!
  }
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    posts: [Post]!
    friends: [User]!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  type Query {
    getMe: User!
    getUsers: [User]
    getPosts: [Post]
    getChat: [Chat]
    getPost(postId: ID!): Post
  }
  # type Chat {
  #   id: ID!
  #   title: String!
  #   users: [User!]!
  #   messages: [Message!]!
  #   lastMessage: Message
  #   createdAt: String!
  #   updatedAt: String!
  # }

  type Mutation {
    # startChat(title: String, userIds: [ID!]!): Chat
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post
    createChat(body: String!): Chat!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addFriend(friendId: ID!): User!
  }
`;
