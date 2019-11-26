import gql from "graphql-tag";

export const FETCH_USER = gql`
  query getUser($userId: ID!) {
    getUser(userId: $userId) {
      username
      friends {
        id
        username
      }
      posts {
        id
        createdAt
        username
        body

        commentCount
        comments {
          id
          createdAt
          username
          body
        }
        likeCount
        likes {
          id
          createdAt
          username
        }
        user {
          id
        }
      }
    }
  }
`;
