import React, { useContext } from "react";
// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  // Card,
  // Button,
  // Grid,
  // Image,
  // Icon,
  //   Label,
  // CardContent,
  // Transition,
  // Container,
  Comment
  // Header,
  // GridColumn
  //   Form
} from "semantic-ui-react";

import { AuthContext } from "../context/auth";

export default function Messages({ id, title, users }) {
  const { user } = useContext(AuthContext);
  const friend = users.filter(friend => friend.username !== user.username);
  const friendUsername = friend[0].username;
  //   const { loading, data } = useQuery(FETCH_USER_CHATS);
  //   let chats = "";
  //   let chatFriend = "";
  //   if (data) {
  //     chats = data.getMe.chats;
  //     console.log(chats.title);
  //     // chatFriend = chats.users[1];
  //   }

  return (
    <div>
      <Comment.Group size="large">
        <Comment>
          <Comment.Avatar
            as="a"
            src="https://cdnb.artstation.com/p/assets/images/images/012/691/701/large/pol-mamaril-sasquatch-nunu-v10-final.jpg?1536047769&dl=1"
          />
          <Comment.Content>
            <Comment.Author as={Link} to={`/messages/${id}`}>
              {friendUsername}
            </Comment.Author>
            <Comment.Metadata>
              <span>Today at 5:42PM</span>
            </Comment.Metadata>
            <Comment.Text>How artistic!</Comment.Text>
            <Comment.Actions>
              <a>Reply</a>
            </Comment.Actions>
          </Comment.Content>
        </Comment>
      </Comment.Group>
    </div>
  );
}
