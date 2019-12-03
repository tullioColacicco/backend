import gql from "graphql-tag";

export const CREATE_MESSAGE = gql`
  mutation createMessage($chatId: ID!, $body: String!) {
    createMessage(chatId: $chatId, body: $body) {
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
