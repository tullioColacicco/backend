const { model, Schema } = require("mongoose");

const chatschema = new Schema({
  title: String,
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
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
