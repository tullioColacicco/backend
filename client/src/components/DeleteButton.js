import React, { useState } from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { Button, Icon, Confirm } from "semantic-ui-react";
import { FETCH_POSTS_QUERY } from "../query/graphql";
import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";

import MyPopup from "../util/MyPopup";

export default function DeleteButton({ postId, commentId, callback }) {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deletePostOrMutation] = useMutation(mutation, {
    refetchQueries: [{ query: FETCH_POSTS_QUERY }],
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        try {
          const userData = proxy.readQuery({
            query: FETCH_USER_POSTS
          });
          const myData = userData.getMe;

          const myPosts = myData.posts.filter(p => p.id !== postId);
          // console.log(new_post);
          const structure = {
            getMe: {
              username: myData.username,
              friends: [...myData.friends],
              profileDescription: { ...myData.profileDescription },
              profilePicture: myData.profilePicture,
              photos: [...myData.photos],
              id: myData.id,
              posts: [...myPosts],
              __typename: myData.__typename
            }
          };
          // console.log(structure);
          proxy.writeQuery({
            query: FETCH_USER_POSTS,
            data: structure
          });

          // const data = proxy.readQuery({
          //   query: FETCH_POSTS_QUERY
          // });
          // console.log(data);
          // const posts = data.getPosts.filter(p => p.id !== postId);
          // proxy.writeQuery({
          //   query: FETCH_POSTS_QUERY,
          //   data: { getPosts: [...posts] }
          // });
          // console.log(data);
        } catch (error) {
          throw new Error(console.log(`error: ${error}`));
        }
      }
      if (callback) callback();
    },
    variables: {
      postId,
      commentId
    }
  });

  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete Post"} inverted>
        <Button
          as="div"
          color="blue"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" color="purple" />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostOrMutation}
      />
    </>
  );
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;
