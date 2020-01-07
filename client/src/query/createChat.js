import gql from "graphql-tag";

export const CREATE_CHAT = gql`
  mutation createChat($userId: ID!) {
    createChat(friendId: $userId) {
      id
    }
  }
`;
