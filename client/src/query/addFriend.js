import gql from "graphql-tag";

export const ADD_FRIEND = gql`
  mutation addFriend($userId: ID!) {
    addFriend(friendId: $userId) {
      id
      username
    }
  }
`;
