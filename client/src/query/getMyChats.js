import gql from "graphql-tag";

export const FETCH_USER_CHATS = gql`
  {
    getMyChats {
      chats {
        id
        title
        users {
          id
          username
        }
        messages {
          id
          body
          sender {
            id
            username
          }
        }
      }
    }
  }
`;
