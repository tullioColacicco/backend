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
  type Comment {
    id: ID!
    createdAt: String!
    username: String!
    body: String!
  }

  type ProfileDescription {
    favoriteMovies: String
    favoriteGames: String
    body: String
  }
  type Like {
    id: ID!
    createdAt: String!
    username: String!
  }
  # type Photo {
  #   id: ID!
  #   url: String!
  # }
  type Photo {
    id: ID!
    url: String!
  }
  type User {
    id: ID!
    email: String!
    token: String!
    username: String!
    createdAt: String!
    profileDescription: ProfileDescription
    profilePicture: String
    photos: [Photo]!
    posts: [Post]!
    friends: [User]!
    chats: [Chat!]!
  }
  input RegisterInput {
    username: String!
    password: String!
    confirmPassword: String!
    email: String!
  }
  input ProfileDescriptionInput {
    favoriteMovies: String!
    favoriteGames: String!
    body: String!
  }
  type Query {
    getChats: [Chat]!
    getMessages: [Message]!
    getMe: User!
    getMyChats: User!
    getUsers: [User]
    getPosts: [Post]
    getPost(postId: ID!): Post
    getUser(userId: ID!): User!
    getChat(chatId: ID!, pageNumber: Int, remainder: Int): Chat!
  }
  type Chat {
    id: ID!
    title: String!
    users: [User!]!
    messages: [Message!]!
    messagesLength: Int!
    lastMessage: Message
    createdAt: String!
    updatedAt: String!
  }
  type Message {
    id: ID!
    body: String!
    sender: User!
    chat: Chat!

    createdAt: String!
    updatedAt: String!
  }

  type Mutation {
    createMessage(chatId: ID!, body: String!): Message!
    register(registerInput: RegisterInput): User!
    login(username: String!, password: String!): User!
    createPost(body: String!): Post
    createChat(friendId: ID!): Chat!
    deletePost(postId: ID!): String!
    createComment(postId: String!, body: String!): Post!
    deleteComment(postId: ID!, commentId: ID!): Post!
    likePost(postId: ID!): Post!
    addFriend(friendId: ID!): User!
    uploadFile(file: Upload!): User!
    setProfilePicture(url: String!): User!
    setProfileDescription(
      profileDescriptionInput: ProfileDescriptionInput!
    ): User!
  }
  type Subscription {
    newChatMessage(chatId: ID!): Message!
    newPost: Post!
    # newChat: Chat!
  }
`;
