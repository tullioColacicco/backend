import React, { useState, useContext } from "react";
import { useQuery } from "@apollo/react-hooks";
// import { Link, Redirect } from "react-router-dom";
import {
  Card,
  Button,
  //   Grid,
  Image
  //   Icon,
  //   Checkbox,
  // CardContent,
  //   Transition,
  //   GridColumn,
  //   Label,
  //   Form
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { GET_PHOTO } from "../query/getPhoto";
// import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";

export default function UserImage(props) {
  const photoId = props.match.params.id;
  const { user } = useContext(AuthContext);
  console.log(photoId);
  const { loading, data } = useQuery(GET_PHOTO, { variables: { photoId } });
  if (data) {
    console.log(data.getPhoto.url);
  }

  return (
    <>
      <Card fluid>
        <Image
          // style={{ padding: "auto" }}
          centered
          verticalAlign="top"
          size={"huge"}
          src={data ? data.getPhoto.url : "loading"}
        />
      </Card>
    </>
  );
}
