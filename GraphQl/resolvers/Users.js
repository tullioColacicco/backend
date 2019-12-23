const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const checkAuth = require("../../util/CheckAuth");

const {
  validateRegisterInput,
  validateLoginInput
} = require("../../util/Validation");
const { SECRET_KEY } = require("../../config");
const User = require("../../models/User");

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { username, password }) {
      console.log("logged");
      const { errors, valid } = validateLoginInput(username, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username }).populate("posts");
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong password";
        throw new UserInputError("Wrong password", { errors });
      }
      const token = generateToken(user);
      return {
        ...user._doc,
        id: user.id,
        token
      };
    },
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
      context,
      info
    ) {
      const { valid, errors } = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError("Username is taken", {
          errors: {
            username: "This username is taken"
          }
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
        profileDescription: {
          favoriteMovies: null,
          favoriteGames: null,
          body: null
        },
        profilePicture:
          "https://i.pinimg.com/originals/b4/25/71/b42571ea8fd0160785dd55d107439570.jpg"
      });

      const res = await newUser.save();

      const token = generateToken(res);
      return {
        ...res._doc,
        id: res.id,
        token
      };
    },
    async addFriend(_, { friendId }, context) {
      const user = checkAuth(context);
      // console.log("ex");
      // console.log(body);

      const me = await User.findById(user.id);
      const friend = await User.findById(friendId);

      try {
        if (me && friend) {
          await me.friends.push(friendId);
          await friend.friends.push(user.id);
          await friend.save();
          await me.save();
        }
      } catch (error) {
        throw new Error(error);
      }
      return me;
    }
  }
};
