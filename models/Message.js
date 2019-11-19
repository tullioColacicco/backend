const { model, Schema } = require("mongoose");

const messageSchema = new Schema({
  body: String,
  sender: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  chat: {
    type: Schema.Types.ObjectId,
    ref: "Chat"
  },
  createdAt: String,

  updatedAt: String
});

module.exports = model("Message", messageSchema);
