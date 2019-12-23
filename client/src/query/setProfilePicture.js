import gql from "graphql-tag";

export const SET_PROFILE_PICTURE = gql`
  mutation setProfilePicture($url: String!) {
    setProfilePicture(url: $url) {
      profilePicture
    }
  }
`;
