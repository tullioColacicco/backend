const {
  AuthenticationError,
  UserInputError,
  withFilter
} = require("apollo-server");

const Post = require("../../models/Post");
const User = require("../../models/User");
const Chat = require("../../models/Chat");
const Message = require("../../models/Message");

const checkAuth = require("../../util/CheckAuth");
const checkChat = require("../../util/CheckChat");

module.exports = {
  Mutation: {
    async createChat(_, { friendId }, context) {
      const user = checkAuth(context);
      // console.log(user.id);
      if (friendId.trim() === "") {
        throw new Error("Post body must not be empty");
      } else if (friendId === user.id) {
        throw new Error("Bad ID");
      }

      try {
        const currentUser = await User.findById(user.id);
        const currentfriend = await User.findById(friendId);
        const chatExits = checkChat(currentUser.chats, currentfriend.chats);
        if (chatExits) {
          throw new Error("Chat already exits");
        }
        const newChat = new Chat({
          title: "ninja chat",
          users: [user.id, friendId],

          createdAt: new Date().toISOString()
        });

        const chat = await newChat.save();
        // context.pubsub.publish("NEW_CHAT", { newChat: chat });

        // console.log(currentfriend);
        // console.log(currentUser);
        if (currentUser && currentfriend) {
          await currentUser.chats.push(chat);
          await currentfriend.chats.push(chat);
          await currentUser.save();
          await currentfriend.save();
        }
        return chat;
      } catch (error) {
        throw new Error(error);
      }
    },
    async createMessage(_, { chatId, body }, context) {
      const user = checkAuth(context);

      const chat = await Chat.findById(chatId);
      const sender = await User.findById(user.id);
      if (!sender || !chat) {
        throw new Error(`sender or chat not found`);
      }

      if (!chat.users.includes(user.id)) {
        throw new Error(`user not in chat!`);
      }
      try {
        if (chat) {
          const newMessage = new Message({
            body,
            sender,
            chat,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          });
          const message = await newMessage.save();
          // console.log(message);
          // context.pubsub.publish("NEW_MESSAGE", { message });

          context.pubsub.publish("NEW_MESSAGE", { newMessage: message });

          await chat.messages.push(message);
          await chat.save();

          return message;
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  },
  Subscription: {
    newChatMessage: {
      resolve: payload => {
        return payload.newMessage;
      },
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("NEW_MESSAGE"),
        (payload, variables) => {
          console.log("variables");
          console.log(variables);
          console.log("payload");
          console.log(payload.newMessage.chat.id);
          // returning true always for testing
          return payload.newMessage.chat.id === variables.chatId;
        }
      )
    },
    newPost: {
      subscribe: withFilter(
        (_, __, { pubsub }) => pubsub.asyncIterator("NEW_POST"),
        (payload, variables) => {
          // console.log("variables");
          // console.log(variables);
          // console.log("payload");
          // console.log(payload);
          // returning true always for testing
          return true;
        }
      )
    }
    // newChat: {
    //   subscribe: (_, __, { pubsub }) => pubsub.asyncIterator("NEW_CHAT")
    // }
  }
};
