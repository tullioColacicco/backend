import React, { useContext } from "react";
// import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Card,
  Button,
  Grid,
  Image,
  Icon,
  //   Label,
  CardContent,
  Transition,
  GridColumn
  //   Form
} from "semantic-ui-react";

import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";
import moment from "moment";
import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import LikeButton from "../components/LikeButton";
import DeleteButton from "../components/DeleteButton";
import MyPopup from "../util/MyPopup";

export default function UserProfile(props) {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_USER_POSTS);
  let posts = "";
  if (data) {
    posts = data.getMe.posts;
    // console.log(data);
  }
  const userId = props.match.params.userId;
  //   console.log(props.match.params);

  return (
    <div>
      <Card>
        <Image
          src="https://i.pinimg.com/originals/b4/25/71/b42571ea8fd0160785dd55d107439570.jpg"
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>Matthew</Card.Header>
          <Card.Meta>
            <span className="date">Joined in 2015</span>
          </Card.Meta>
          <Card.Description>
            Matthew is a musician living in Nashville.
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          {/* <a> */}
          <Icon name="user" />
          22 Friends
          {/* </a> */}
        </Card.Content>
      </Card>

      {/* POSTS */}
      <Grid columns={4} divided>
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
      </Grid>
    </div>
  );
}
