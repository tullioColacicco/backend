const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Chat = require("../../models/Chat");

const checkAuth = require("../../util/CheckAuth");

module.exports = {
  Query: {
    async getUsers() {
      try {
        const user = await User.find()
          .sort({ createdAt: -1 })
          .populate(["posts", "friends"]);
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPosts() {
      console.log("hello");
      try {
        const posts = await Post.find()
          .populate("user")
          .sort({ createdAt: -1 });

        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getChat() {
      console.log("hello");
      try {
        const chat = await Chat.find()
          .populate("users")
          .sort({ createdAt: -1 });

        return chat;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getMe(_, __, context) {
      const user = checkAuth(context);
      const me = await User.findById(user.id);
      return me;
    },
    async getPost(_, { postId }) {
      try {
        const post = await Post.findById(postId).populate("user");

        if (post) {
          return post;
        } else {
          throw new Error("Post not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    }
  },
  Mutation: {
    async createPost(_, { body }, context) {
      const user = checkAuth(context);
      // console.log(user.id);
      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      try {
        const currentUser = await User.findById(user.id);
        if (currentUser) {
          await currentUser.posts.push(post);
          await currentUser.save();
        }
      } catch (error) {
        throw new Error(error);
      }
      return post;
    },
    async createChat(_, { body }, context) {
      const user = checkAuth(context);
      // console.log(user.id);
      if (body.trim() === "") {
        throw new Error("Post body must not be empty");
      }
      const newChat = new Chat({
        body,

        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newChat.save();
      await post.users.push(user.id);
      await post.save();

      // try {
      //   const currentUser = await User.findById(user.id);
      //   if (currentUser) {
      //     await currentUser.posts.push(post);
      //     await currentUser.save();
      //   }
      // } catch (error) {
      //   throw new Error(error);
      // }
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
      const currentUser = await User.findById(user.id);
      if (currentUser) {
        await currentUser.posts.pull(postId);
        await currentUser.save();
      }
      try {
        const post = await Post.findById(postId);
        if (user.username === post.username) {
          await post.delete();
          return "Post deleted successfully";
        } else {
          throw new AuthenticationError("Action not Allowed");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
    async likePost(_, { postId }, context) {
      const { username } = checkAuth(context);

      const post = await Post.findById(postId);
      if (post) {
        if (post.likes.find(like => like.username === username)) {
          post.likes = post.likes.filter(like => like.username !== username);
        } else {
          post.likes.push({
            username,
            createdAt: new Date().toISOString()
          });
        }
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    }
  }
};
