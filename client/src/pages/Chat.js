import React, { useContext, useState, useRef, useEffect } from "react";
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
import { relative } from "path";

export default function Chat(props) {
  const [values, setValues] = useState({
    body: ""
  });
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(true);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const { user } = useContext(AuthContext);
  const chatId = props.match.params.chatId;
  const { loading, data, fetchMore } = useQuery(FETCH_CHAT, {
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
              subscriptionData.data.newChatMessage,
              ...myData.messages
            ],

            users: [...myData.users],
            __typename: myData.__typename
          }
        };

        client.writeQuery({
          query: FETCH_CHAT,
          variables: { chatId },
          data: structure
        });
        messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        console.log(messages.length);
      } catch (error) {
        throw new Error(console.log(`error: ${error}`));
      }
    }
  });
  let pageNumber = null;
  function handleClick() {
    setPage(page + 1);
    pageNumber = messages.length;
    fetchMore({
      variables: { chatId, pageNumber },
      updateQuery: (previousResult, { fetchMoreResult }) => {
        // console.log(previousResult.getChat.messages);
        console.log(fetchMoreResult.getChat.messages);
        if (!fetchMoreResult) {
          return previousResult;
        }
        if (fetchMoreResult.getChat.messages.length < 5) {
          setLoadMore(false);
        }
        return {
          getChat: {
            id: previousResult.getChat.id,
            title: previousResult.getChat.title,
            messages: [
              ...previousResult.getChat.messages,
              ...fetchMoreResult.getChat.messages
            ],

            users: [...previousResult.getChat.users],
            __typename: previousResult.getChat.__typename
          }
        };
      }
    });
    console.log(messages.length);
  }

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

  // function scrollToTop() {
  //   messageTop.current.scrollIntoView(true);
  // }

  useEffect(scrollToBottom, [messages]);

  function onChange(event) {
    setValues({ ...values, [event.target.name]: event.target.value });
  }
  function handleScroll() {
    if (messagesEndRef && messagesEndRef.current.scrollTop === 0) {
      setPage(page + 1);
      pageNumber = messages.length;
      fetchMore({
        variables: { chatId, pageNumber },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          // console.log(previousResult.getChat.messages);
          console.log(fetchMoreResult.getChat.messages);
          if (!fetchMoreResult) {
            return previousResult;
          }
          if (fetchMoreResult.getChat.messages.length < 5) {
            setLoadMore(false);
          }
          return {
            getChat: {
              id: previousResult.getChat.id,
              title: previousResult.getChat.title,
              messages: [
                ...previousResult.getChat.messages,
                ...fetchMoreResult.getChat.messages
              ],

              users: [...previousResult.getChat.users],
              __typename: previousResult.getChat.__typename
            }
          };
        }
      });

      console.log(messagesEndRef.current.scrollTop);
      console.log(messagesEndRef.current.scrollHeight);
    }
  }

  return (
    <div>
      <Container>
        <Header textAlign="center">{chat.title}</Header>
        <Button
          primary={loadMore}
          onClick={handleClick}
          style={{ marginBottom: 20 }}
        >
          Load More {pageNumber}
        </Button>

        <div
          ref={messagesEndRef}
          onScroll={handleScroll}
          style={{
            overflow: "auto",
            height: 500,
            display: "flex",
            flexDirection: "column-reverse"
          }}
        >
          <Container
            style={{
              // overflow: "auto",
              // height: 500,
              display: "flex",
              flexDirection: "column-reverse"
            }}
            // ref={messageTop}
          >
            {data &&
              messages.map(message => {
                return (
                  <ChatRoom key={message.id} message={message} {...message} />
                );
              })}
          </Container>
        </div>
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
