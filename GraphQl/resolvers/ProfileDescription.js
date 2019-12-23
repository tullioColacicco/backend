const {
  AuthenticationError,
  UserInputError,
  withFilter
} = require("apollo-server");

const User = require("../../models/User");

const checkAuth = require("../../util/CheckAuth");

module.exports = {
  Mutation: {
    async setProfileDescription(
      _,
      { profileDescriptionInput: { favoriteGames, favoriteMovies, body } },
      context
    ) {
      const user = checkAuth(context);
      console.log(favoriteGames);
      // const { favoriteMovies } = profileDesciptionInput;
      // const { favoriteGames } = profileDesciptionInput;
      // const { body } = profileDesciptionInput;

      try {
        const currentUser = await User.findById(user.id);
        console.log(currentUser.profileDescription);
        if (currentUser) {
          currentUser.profileDescription.favoriteMovies = favoriteMovies;
          currentUser.profileDescription.favoriteGames = favoriteGames;
          currentUser.profileDescription.body = body;
        }

        await currentUser.save();

        return currentUser;
      } catch (error) {
        throw new Error(error);
      }
    }
  }
};
