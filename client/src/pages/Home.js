import React, { useContext } from "react";
import { useQuery } from "@apollo/react-hooks";

import { Grid, GridColumn, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../query/graphql";

import { AuthContext } from "../context/auth";

export default function Home() {
  const { user } = useContext(AuthContext);
  const { loading, data } = useQuery(FETCH_POSTS_QUERY);
  let posts = "";
  if (data) {
    posts = data.getPosts;
  }

  return (
    <Grid columns={3}>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
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
  );
}
