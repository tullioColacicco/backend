import React, { useContext } from "react";
// import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Grid,
  Image,
  // Icon,
  //   Label,
  // CardContent,
  Transition,
  GridColumn
  //   Form
} from "semantic-ui-react";

import { FETCH_USER } from "../query/fetchUser";
import { CREATE_CHAT } from "../query/createChat";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import Images from "../components/Images";
import ProfileDescription from "../components/ProfileDescription";

export default function FriendProfile(props) {
  const userId = props.match.params.friendId;

  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_USER, {
    variables: { userId }
  });
  const [createChat] = useMutation(CREATE_CHAT, {
    variables: { userId }
  });

  let posts = "";
  let photos = [];
  if (data) {
    posts = data.getUser.posts;
    photos = data.getUser.photos;
    // console.log(data);
  }
  console.log(data);
  let currentChatId = false;
  console.log(currentChatId);
  const chats = data ? data.getUser.chats : "loading";

  if (chats !== "loading") {
    for (let chat of chats) {
      // console.log(chat.users[0]);

      if (chat.users[0].id || chat.users[1].id === user.id) {
        currentChatId = chat.id;
      }
    }
  }

  // if (chats) {
  //   for (let chat of chats) {
  //     const array = chat.map(user => user.id);
  //     console.log(array);
  //     // if (array.includes(userId)) {
  //     //   setHasChat(true);
  //     // }
  //   }
  // }

  const username = data ? data.getUser.username : "loading";
  const profilePicture = data ? data.getUser.profilePicture : "loading";
  const profileDescription = data ? data.getUser.profileDescription : "loading";
  const friendCount = data ? data.getUser.friends.length : "loading";
  //   console.log(props.match.params);

  return (
    <div>
      <Grid columns={3} divided>
        <Grid.Row>
          <GridColumn>
            <Card>
              <Image src={profilePicture} wrapped ui={false} />
              <Card.Content>
                <Card.Header>{username}</Card.Header>
                <Card.Meta>
                  <span className="date">Joined in 2015</span>
                </Card.Meta>
                <Card.Description>
                  Matthew is a musician living in Nashville.
                </Card.Description>
              </Card.Content>
              <Card.Content>
                <Button size="mini" icon="user" basic as={Link} to={"/friends"}>
                  {/* <Icon name="user" /> */}
                </Button>
                {friendCount}
                {currentChatId ? (
                  <Button
                    floated="right"
                    //   icon="plus square outline"
                    size="mini"
                    as={Link}
                    to={`/messages/${currentChatId}`}
                  >
                    Start Chat
                    {/* <Icon name="plus square outline" corner="bottom right" /> */}
                  </Button>
                ) : (
                  <Button
                    floated="right"
                    //   icon="plus square outline"
                    size="mini"
                    as={Link}
                    to={`/messages/${currentChatId}`}
                    onClick={createChat}
                  >
                    Start Chat
                    {/* <Icon name="plus square outline" corner="bottom right" /> */}
                  </Button>
                )}
              </Card.Content>
            </Card>
          </GridColumn>
          <GridColumn textAlign="center">
            MAKE DESCRIPTION FOR PROFILE HERE
            <ProfileDescription
              profileDescription={profileDescription}
              {...profileDescription}
              userId={userId}
            />
          </GridColumn>

          <GridColumn textAlign="center">
            Images
            <Grid celled>
              <GridColumn>
                {/* <div style={{ marginBottom: "50px" }}>
                <input type="file" onChange={handleFile}></input>
                <button onClick={handleSubmit}>Upload</button>
              </div> */}

                <Grid columns={4} divided>
                  <Grid.Row>
                    {/* {loading ? <div>loading...</div> : null} */}
                    {data ? (
                      photos.map((photo, index) => {
                        return <Images key={index} photo={photo} {...photo} />;
                      })
                    ) : (
                      <GridColumn>loading</GridColumn>
                    )}
                  </Grid.Row>
                </Grid>
              </GridColumn>
            </Grid>
          </GridColumn>
        </Grid.Row>
      </Grid>

      {/* POSTS */}
      <Grid columns={4} divided>
        <Grid.Row>
          {/* {user && (
          <GridColumn>
            <PostForm />
          </GridColumn>
        )} */}
          {loading ? (
            <h1>loading posts...</h1>
          ) : (
            <Transition.Group>
              {posts &&
                posts.map(post => {
                  return (
                    <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
                      <PostCard post={post} {...post} />
                    </Grid.Column>
                  );
                })}
            </Transition.Group>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
