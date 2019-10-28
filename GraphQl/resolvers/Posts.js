const { AuthenticationError, UserInputError } = require("apollo-server");

const Post = require("../../models/Post");
const User = require("../../models/User");

const checkAuth = require("../../util/CheckAuth");

module.exports = {
  Query: {
    async getUsers() {
      try {
        const user = await User.find()
          .sort({ createdAt: -1 })
          .populate("posts");
        return user;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getPosts() {
      try {
        const posts = await Post.find()
          .populate("user")
          .sort({ createdAt: -1 });

        return posts;
      } catch (err) {
        throw new Error(err);
      }
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
      console.log(user.id);
      const newPost = new Post({
        body,
        user: user.id,
        username: user.username,
        createdAt: new Date().toISOString()
      });

      const post = await newPost.save();

      try {
        const currentUser = await User.findById(user.id);
        console.log(newPost);
        if (currentUser) {
          await currentUser.posts.push(post);
          await currentUser.save();
        }
      } catch (error) {
        throw new Error(error);
      }
      return post;
    },
    async deletePost(_, { postId }, context) {
      const user = checkAuth(context);
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
