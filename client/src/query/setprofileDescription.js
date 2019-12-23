import gql from "graphql-tag";

export const SET_PROFILE_DESCRIPTION = gql`
  mutation setProfileDescription(
    $favoriteMovies: String!
    $favoriteGames: String!
    $body: String!
  ) {
    setProfileDescription(
      profileDescriptionInput: {
        favoriteMovies: $favoriteMovies
        favoriteGames: $favoriteGames
        body: $body
      }
    ) {
      username
      profileDescription {
        favoriteMovies
        favoriteGames
        body
      }
    }
  }
`;
