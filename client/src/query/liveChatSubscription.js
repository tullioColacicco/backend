import gql from "graphql-tag";

export const LISTEN_FOR_MESSAGE = gql`
  subscription newChatMessage($chatId: ID!) {
    newChatMessage(chatId: $chatId) {
      id
      body
      createdAt
      sender {
        id
        username
      }
    }
  }
`;
