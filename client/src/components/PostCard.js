import React, { useContext } from "react";
import { Button, Card, Icon, Label, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import moment from "moment";
import LikeButton from "../components/LikeButton";
import DeleteButton from "./DeleteButton";

import { AuthContext } from "../context/auth";
import MyPopup from "../util/MyPopup";

export default function PostCard({
  post,
  body,
  createdAt,
  id,
  username,
  likeCount,
  commentCount,
  likes
}) {
  const { user } = useContext(AuthContext);
  // console.log(post.user.id);
  console.log(post);
  let isMe = "";
  if (user) {
    isMe = user.username === username ? true : false;
  }
  let profile = "";
  let userId = "";
  // const postUserId = post.user.id ? post.user.id : false;
  // if (!postUserId) {
  //   userId = user.id;
  // } else userId = post.user.id;
  // if (post.user.id === user.id) {
  //   profile = "myProfile";
  // } else profile = "profile";

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated="right"
          size="mini"
          src="https://react.semantic-ui.com/images/avatar/large/molly.png"
        />
        {isMe ? (
          <Card.Header as={Link} to={`/myProfile/${user.id}`}>
            {username}
          </Card.Header>
        ) : (
          <Card.Header as={Link} to={`/profile/${post.user.id}`}>
            {username}
          </Card.Header>
        )}
        <Card.Meta as={Link} to={`/posts/${id}`}>
          {moment(createdAt).fromNow(true)}
        </Card.Meta>
        <Card.Description>{body}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <LikeButton user={user} post={post} {...post} />
        <MyPopup content="Comment on post" inverted>
          <Button labelPosition="right" as={Link} to={`/posts/${id}`}>
            <Button color="teal" basic>
              <Icon name="comments" />
            </Button>
            <Label basic color="teal" pointing="left">
              {commentCount}
            </Label>
          </Button>
        </MyPopup>

        {user && user.username === username && <DeleteButton postId={id} />}
      </Card.Content>
    </Card>
  );
}
