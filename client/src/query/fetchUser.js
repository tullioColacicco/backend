import gql from "graphql-tag";

export const FETCH_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
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
      chats {
        id
        users {
          id
        }
      }
      posts {
        user {
          id
        }
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
