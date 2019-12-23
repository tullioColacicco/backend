import gql from "graphql-tag";

export const FETCH_USER_POSTS = gql`
  {
    getMe {
      username
      id
      profileDescription {
        favoriteMovies
        favoriteGames
        body
      }
      profilePicture
      photos {
        url
        id
      }
      friends {
        id
        username
      }
      posts {
        id
        body
        createdAt
        username
        likeCount
        likes {
          username
        }
        commentCount
        comments {
          id
          username
          createdAt
          body
        }
      }
    }
  }
`;
