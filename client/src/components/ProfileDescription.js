import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import {
  Card,
  Button,
  Grid,
  Image,
  Icon,
  Checkbox,
  // CardContent,
  Transition,
  GridColumn,
  Label,
  Form,
  Header
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";
import { SET_PROFILE_DESCRIPTION } from "../query/setprofileDescription";

export default function ProfileDescription({
  body,
  favoriteMovies,
  favoriteGames
}) {
  const { user } = useContext(AuthContext);
  const [values, setValues] = useState({
    favoriteMovies: "",
    favoriteGames: "",
    body: ""
  });

  const [setProfileDescription] = useMutation(SET_PROFILE_DESCRIPTION, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_POSTS
      });
      console.log(result.data.setProfileDescription);
      const structure = {
        getMe: {
          ...data.getMe,
          profileDescription: {
            ...result.data.setProfileDescription.profileDescription
          }
        }
      };

      try {
        console.log(structure.getMe);
        proxy.writeQuery({
          query: FETCH_USER_POSTS,
          data: structure
        });
      } catch (error) {}
    }
  });

  const [hide, setHide] = useState(true);

  function handleHide() {
    setHide(!hide);
  }
  const onChange = event => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const onSubmit = event => {
    event.preventDefault();
    setProfileDescription();
    setHide(!hide);
  };

  return (
    <div>
      <Header
        floated="right"
        as="h6"
        color="teal"
        style={{ marginBottom: "10px" }}
      >
        <Button basic color="teal" size="mini" onClick={handleHide}>
          Edit
        </Button>
      </Header>
      <br />
      {hide ? (
        <Grid celled>
          <Grid.Row>
            <GridColumn textAlign="center">
              Favorite Movies: {favoriteMovies}
            </GridColumn>
          </Grid.Row>
          <Grid.Row>
            <GridColumn textAlign="center">
              Favorite Games: {favoriteGames}{" "}
            </GridColumn>
          </Grid.Row>
          <Grid.Row>
            <GridColumn textAlign="center">Body: {body} </GridColumn>
          </Grid.Row>
        </Grid>
      ) : (
        <Form onSubmit={onSubmit}>
          <Grid celled>
            <Grid.Row>
              <GridColumn textAlign="center">
                {/* <Header
                  floated="right"
                  as="h6"
                  color="teal"
                  style={{ paddingTop: "10px" }}
                >
                  <Button basic color="teal" size="mini" onClick={handleHide}>
                    Edit
                  </Button>
                </Header> */}
                Favorite Movies:{" "}
                <Form.Input
                  placeholder="Favorite Movies"
                  name="favoriteMovies"
                  onChange={onChange}
                  value={values.favoriteMovies}
                  //   error={errors.message}
                />
              </GridColumn>
            </Grid.Row>
            <Grid.Row>
              <GridColumn textAlign="center">
                Favorite Games:{" "}
                <Form.Input
                  placeholder="Favorite Games"
                  name="favoriteGames"
                  onChange={onChange}
                  value={values.favoriteGames}
                  //   error={errors.message}
                />
              </GridColumn>
            </Grid.Row>
            <Grid.Row>
              <GridColumn textAlign="center">
                Body:{" "}
                <Form.Input
                  placeholder="Body"
                  name="body"
                  onChange={onChange}
                  value={values.body}
                  //   error={errors.message}
                />
              </GridColumn>
            </Grid.Row>
            <Grid.Row>
              <GridColumn textAlign="right">
                <Button
                  basic
                  color="teal"
                  size="mini"
                  floated="right"
                  //   onClick={handleHide}
                >
                  submit
                </Button>
              </GridColumn>
            </Grid.Row>
          </Grid>
        </Form>
      )}
    </div>
  );
}
