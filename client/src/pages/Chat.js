import React, { useContext, useState } from "react";
// import gql from "graphql-tag";
import { useQuery, useMutation, useSubscription } from "@apollo/react-hooks";
// import { Link } from "react-router-dom";
import {
  Button,

  //   Label,
  // CardContent,
  Container,
  Header,
  Form
} from "semantic-ui-react";

import { FETCH_CHAT } from "../query/fetchChat";
import { CREATE_MESSAGE } from "../query/createMessage";
import { LISTEN_FOR_MESSAGE } from "../query/liveChatSubscription";

import { AuthContext } from "../context/auth";
import ChatRoom from "../components/ChatRoom";

export default function Chat(props) {
  const [values, setValues] = useState({
    body: ""
  });

  const { user } = useContext(AuthContext);
  const chatId = props.match.params.chatId;
  const { loading, data, subscribeToMore } = useQuery(FETCH_CHAT, {
    variables: { chatId }
  });
  const [createMessage] = useMutation(CREATE_MESSAGE, {
    variables: { chatId, body: values.body },
    update() {
      setValues({ body: "" });
    }
  });

  const { data: message } = useSubscription(LISTEN_FOR_MESSAGE, {
    variables: { chatId },
    onSubscriptionData: ({ client, subscriptionData }) => {
      try {
        const chat = client.readQuery({
          query: FETCH_CHAT,
          variables: { chatId }
        });
        const myData = chat.getChat;
        const structure = {
          getChat: {
            id: myData.id,
            title: myData.title,
            messages: [
              ...myData.messages,
              subscriptionData.data.newChatMessage
            ],

            users: [...myData.users],
            __typename: myData.__typename
          }
        };
        // console.log(chat);
        // console.log(structure);
        // console.log(myData.__typename);
        // console.log(subscriptionData.data);
        client.writeQuery({
          query: FETCH_CHAT,
          variables: { chatId },
          data: structure
        });
      } catch (error) {
        throw new Error(console.log(`error: ${error}`));
      }
    }
  });

  // const subscribe = () =>
  //   subscribeToMore({
  //     document: LISTEN_FOR_MESSAGE,
  //     variables: { chatId },
  //     updateQuery: (prev, { data: message }) => {
  //       console.log(prev);
  //       if (!data) return prev;

  //       return { message: [...prev.message, message] };
  //     }
  //   });

  // console.log(subcriptionMessages);
  // if (message) {
  //   // subscribe();
  //   console.log(message);
  //   // setSubscriptionMessage({ ...subcriptionMessages, subcriptionMessage });
  // }
  function onSubmit(event) {
    event.preventDefault();

    createMessage();
  }

  let chat = "";
  let messages = "";
  if (data) {
    chat = data.getChat;
    messages = chat.messages;
    // console.log(chat.messages);
  }
  function onChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }

  return (
    <div>
      <Container>
        <Header textAlign="center">{chat.title}</Header>
        {data &&
          messages.map(message => {
            return <ChatRoom key={message.id} message={message} {...message} />;
          })}
        {/* {message && <ChatRoom message={message} {...message} />} */}
        <Form reply onSubmit={onSubmit}>
          <Form.TextArea
            placeholder="Create Message"
            name="body"
            onChange={onChange}
            value={values.body}
          />
          <Button
            content="Send Message"
            labelPosition="left"
            icon="edit"
            primary
          />
        </Form>
      </Container>
    </div>
  );
}
