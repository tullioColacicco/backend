import gql from "graphql-tag";

export const FETCH_CHAT = gql`
  query getChat($chatId: ID!, $pageNumber: Int, $remainder: Int) {
    getChat(chatId: $chatId, pageNumber: $pageNumber, remainder: $remainder) {
      id
      title
      users {
        id
        username
      }
      messagesLength
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
