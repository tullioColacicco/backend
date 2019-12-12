import gql from "graphql-tag";

export const FETCH_CHAT = gql`
  query getChat($chatId: ID!, $pageNumber: Int) {
    getChat(chatId: $chatId, pageNumber: $pageNumber) {
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
