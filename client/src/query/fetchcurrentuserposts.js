import gql from "graphql-tag";

export const FETCH_USER_POSTS = gql`
  {
    getMe {
      username
      id
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
