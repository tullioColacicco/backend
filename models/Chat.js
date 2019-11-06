const { model, Schema } = require("mongoose");

const Chat = new Schema({
  body: String,
  username: String,
  createdAt: String,

  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ]
});

module.exports = model("Chat", Chat);
