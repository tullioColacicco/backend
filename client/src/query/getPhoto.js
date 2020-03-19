import gql from "graphql-tag";

export const GET_PHOTO = gql`
  query getPhoto($photoId: ID!) {
    getPhoto(photoId: $photoId) {
      url
      id
    }
  }
`;
