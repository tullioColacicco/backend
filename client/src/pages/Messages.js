import React, { useContext } from "react";
// import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
// import { Link } from "react-router-dom";
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

import { FETCH_USER_CHATS } from "../query/getMyChats";

import { AuthContext } from "../context/auth";
import MessagePreview from "../components/MessagePreview";

export default function Messages() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_USER_CHATS);
  let chats = "";
  let chatFriend = "";
  if (data) {
    chats = data.getMe.chats;
    console.log(chats.title);
    // chatFriend = chats.users[1];
  }
  return (
    <div>
      <Container>
        <Header textAlign="center">My Messages</Header>
        {chats &&
          chats.map(chat => {
            return <MessagePreview key={chat.id} chat={chat} {...chat} />;
          })}
      </Container>
    </div>
  );
}
