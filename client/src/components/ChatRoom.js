import React, { useContext } from "react";
// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  Card,
  // Button,
  Grid,
  Image,
  Icon,
  //   Label,
  // CardContent,
  Transition,
  Container,
  Comment,
  Header,
  GridColumn
  //   Form
} from "semantic-ui-react";

import moment from "moment";
import { FETCH_USER_CHATS } from "../query/getMyChats";

import { AuthContext } from "../context/auth";

export default function Messages({
  id,
  title,
  users,
  sender,
  body,
  createdAt
}) {
  //   console.log(users[1].username);
  //   const friendUsername = users[1].username;
  const { user } = useContext(AuthContext);

  return (
    <div>
      <Comment.Group size="massive">
        <Comment key={id}>
          <Comment.Avatar
            as="a"
            src="https://cdnb.artstation.com/p/assets/images/images/012/691/701/large/pol-mamaril-sasquatch-nunu-v10-final.jpg?1536047769&dl=1"
          />
          <Comment.Content>
            <Comment.Author as="a">{sender.username}</Comment.Author>
            <Comment.Metadata>
              <span> {moment(createdAt).fromNow(true)} ago</span>
            </Comment.Metadata>
            <Comment.Text>{body}</Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </div>
  );
}
