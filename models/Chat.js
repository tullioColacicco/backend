const { model, Schema } = require("mongoose");

const chatschema = new Schema({
  title: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  messagesLength: Number,

  messages: [
    {
      type: Schema.Types.ObjectId,
      ref: "Message"
    }
  ],
  createdAt: String,

  updatedAt: String
});

module.exports = model("Chat", chatschema);
