import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { FETCH_POSTS_QUERY } from "../query/graphql";
import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";

export default function PostForm() {
  const [errors, setErrors] = useState({});
  const [values, setValues] = useState({
    body: ""
  });

  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const [createPost, { loading }] = useMutation(CREATE_POST_MUTATION, {
    variables: values,
    update(proxy, result) {
      // FIX CACHE LOADING ISSUE
      const data = proxy.readQuery({
        query: FETCH_POSTS_QUERY
      });
      console.log(data);
      const new_post = result.data.createPost;
      console.log(new_post.id);
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: { getPosts: [new_post, ...data.getPosts] }
      });
      try {
        const userData = proxy.readQuery({
          query: FETCH_USER_POSTS
        });
        const myData = userData.getMe;

        const new_post = result.data.createPost;
        console.log(myData.id);
        const structure = {
          getMe: {
            username: myData.username,
            friends: [...myData.friends],
            id: myData.id,
            posts: [...myData.posts, new_post],
            __typename: myData.__typename
          }
        };
        console.log(structure);
        proxy.writeQuery({
          query: FETCH_USER_POSTS,
          data: structure
        });
      } catch (error) {
        throw new Error(console.log(`error: ${error}`));
      }
      // console.log(userData.posts);
      // console.log(userData.getMe);

      values.body = "";
    },
    // update(proxy, result) {
    //   const userData = proxy.readQuery({
    //     query: FETCH_USER_POSTS
    //   });
    //   // console.log(userData.getMe.posts);
    //   // console.log(userData);

    //   const new_post = result.createPost;
    //   proxy.writeQuery({
    //     query: FETCH_USER_POSTS,
    //     userData: { posts: [new_post, ...userData.posts] }
    //   });
    //   values.body = "";
    // },

    onError(err) {
      setErrors(err.graphQLErrors[0]);
    }
  });
  const onSubmit = event => {
    event.preventDefault();
    createPost();
  };

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create a Post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="Hi World"
          name="body"
          onChange={onChange}
          value={values.body}
          error={errors.message}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
}

const CREATE_POST_MUTATION = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
      createdAt
      username
      likes {
        id
        username
        createdAt
      }
      likeCount
      comments {
        id
        body
        username
        createdAt
      }
      commentCount
      user {
        id
      }
    }
  }
`;
