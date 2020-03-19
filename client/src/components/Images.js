import React, { useState, useContext } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link, Redirect } from "react-router-dom";
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
  Form
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { SET_PROFILE_PICTURE } from "../query/setProfilePicture";
import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";

export default function UserImages({ url, imageSize, userImagesPage, id }) {
  const { user } = useContext(AuthContext);
  const [setProfilePicture] = useMutation(SET_PROFILE_PICTURE, {
    variables: { url },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_POSTS
      });
      // console.log(result);
      const structure = {
        getMe: {
          ...data.getMe,
          profilePicture: result.data.setProfilePicture.profilePicture
        }
      };

      try {
        // console.log(structure.getMe);
        proxy.writeQuery({
          query: FETCH_USER_POSTS,
          data: structure
        });
      } catch (error) {}
    }
  });

  const [hide, setHide] = useState(true);
  const [redirect, setRedirect] = useState(false);
  function handleHide() {
    setHide(!hide);
  }
  function handleRedirect() {
    setRedirect(true);
  }
  function check(url) {
    console.log(url);
  }

  return (
    <>
      {userImagesPage && redirect ? (
        <Redirect to={`/images/${id}`} />
      ) : (
        <GridColumn verticalAlign="middle" textAlign="center">
          <Card centered onClick={userImagesPage ? handleRedirect : handleHide}>
            <Image
              // style={{ padding: "auto" }}
              centered
              verticalAlign="top"
              size={imageSize ? imageSize : "tiny"}
              src={url}
            />
            {!hide && (
              <Button
                onClick={setProfilePicture}
                size="mini"
                type="submit"
                color="teal"
                // style={{ textAlign: "center !important", marginTop: "10px" }}
                basic
              >
                Submit
              </Button>
            )}
          </Card>
        </GridColumn>
      )}
    </>
  );
}
