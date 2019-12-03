import gql from "graphql-tag";

export const FETCH_CHAT = gql`
  query getChat($chatId: ID!) {
    getChat(chatId: $chatId) {
      id
      title
      users {
        id
        username
      }
      messages {
        id
        body
        createdAt
        sender {
          id
          username
        }
      }
    }
  }
`;
