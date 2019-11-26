import React, { useContext } from "react";
// import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  Card,
  Button,
  Grid,
  Image,
  Icon,
  //   Label,
  // CardContent,
  Transition,
  GridColumn
  //   Form
} from "semantic-ui-react";

import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";

import { AuthContext } from "../context/auth";

export default function UserProfile(props) {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_USER_POSTS);
  let posts = "";
  if (data) {
    posts = data.getMe.posts;
  }
  console.log(data);
  const userId = props.match.params.userId;
  const username = data ? data.getMe.username : "loading";
  const friendCount = data ? data.getMe.friends.length : "loading";
  const friends = data ? data.getMe.friends : "loading";
  //   console.log(props.match.params);

  return (
    <div>
      {data
        ? friends.map(friend => {
            return (
              <Grid columns={4} divided key={friend.id}>
                <Grid.Row>
                  <GridColumn>
                    <Card>
                      <Image
                        src="https://i.pinimg.com/originals/b4/25/71/b42571ea8fd0160785dd55d107439570.jpg"
                        wrapped
                        ui={false}
                      />
                      <Card.Content>
                        <Card.Header as={Link} to={`/friends/${friend.id}`}>
                          {friend.username}

                          <Button
                            as={Link}
                            to={"/"}
                            labelPosition="right"
                            floated="right"
                            // active
                          >
                            <Icon name="at" />
                          </Button>
                        </Card.Header>

                        <Card.Meta>
                          <span className="date">Joined in 2015</span>
                        </Card.Meta>
                        <Card.Description>
                          Matthew is a musician living in Nashville.
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra as={Link} to={"/friends"}>
                        <Icon name="user" />
                        {friendCount}
                      </Card.Content>
                    </Card>
                  </GridColumn>
                </Grid.Row>
              </Grid>
            );
          })
        : "loading"}

      {/* POSTS */}
      {/* <Grid columns={4} divided>
        <Grid.Row>
          {user && (
            <GridColumn>
              <PostForm />
            </GridColumn>
          )}
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
      </Grid> */}
    </div>
  );
}
