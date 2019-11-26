import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Button, Icon, Label } from "semantic-ui-react";
import MyPopup from "../util/MyPopup";
import { AuthContext } from "../context/auth";
// import { FETCH_USER } from "../query/fetchUser";

export default function LikeButton({ id, likes, likeCount, hello }) {
  const [liked, setLiked] = useState(false);
  const { user } = useContext(AuthContext);
  // const userId = match.params.friendId;
  // const location = window.location.pathname;
  // const userId = location.split("/")[2];
  // const friendLocation = location.split("/")[1];
  useEffect(() => {
    if (user && likes.find(like => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId: id }
    // update(proxy, result) {
    //   console.log(result.data.likePost.likes);
    //   if (friendLocation) {
    //     try {
    //       const userData = proxy.readQuery({
    //         query: FETCH_USER,
    //         variables: { userId }
    //       });
    //       const myData = userData.getUser;
    //       console.log(userData.getUser);

    //       const like = result.data.likePost;
    //       const newPosts = myData.posts.filter(post => post.id !== id);
    //       console.log(newPosts);

    //       const structure = {
    //         getMe: {
    //           username: myData.username,
    //           friends: [...myData.friends],
    //           id: myData.id,
    //           posts: [...newPosts, like],
    //           __typename: myData.__typename
    //         }
    //       };

    //       proxy.writeQuery({
    //         query: FETCH_USER,
    //         variables: { userId },
    //         data: structure
    //       });
    //     } catch (error) {
    //       throw new Error(console.log(`error: ${error}`));
    //     }
    //   }
    // }
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
        Like
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
        Like
      </Button>
    )
  ) : (
    <Button as={Link} to={"/login"} color="teal" basic>
      <Icon name="heart" />
      Like
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <MyPopup content={liked ? "Unlike" : "Like"} inverted>
        {likeButton}
      </MyPopup>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
    }
  }
`;
