const { model, Schema } = require("mongoose");

const userSchema = new Schema({
  username: String,
  password: String,
  email: String,
  createdAt: String,
  profilePicture: String,
  profileDescription: {
    favoriteMovies: { type: String },
    favoriteGames: { type: String },
    body: { type: String }
  },
  photos: [
    {
      url: String
    }
  ],
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post"
    }
  ],
  friends: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],

  chats: [
    {
      type: Schema.Types.ObjectId,
      ref: "Chat"
    }
  ]
});

module.exports = model("User", userSchema);
