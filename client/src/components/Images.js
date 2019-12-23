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
  Form
} from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import { SET_PROFILE_PICTURE } from "../query/setProfilePicture";
import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";

export default function Images({ url }) {
  const { user } = useContext(AuthContext);
  const [setProfilePicture] = useMutation(SET_PROFILE_PICTURE, {
    variables: { url },
    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_POSTS
      });
      console.log(result);
      const structure = {
        getMe: {
          ...data.getMe,
          profilePicture: result.data.setProfilePicture.profilePicture
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

  return (
    // <Card >
    //   <Image
    //     src="https://i.pinimg.com/originals/b4/25/71/b42571ea8fd0160785dd55d107439570.jpg"
    //     wrapped
    //     ui={false}
    //   />
    //   <Card.Content>
    //     <Card.Header>lol</Card.Header>
    //     <Card.Meta>
    //       <span className="date">Joined in 2015</span>
    //     </Card.Meta>
    //     <Card.Description>
    //       Matthew is a musician living in Nashville.
    //     </Card.Description>
    //   </Card.Content>
    //   <Card.Content>
    //     <Icon name="user" />
    //     skrr
    //   </Card.Content>
    // </Card>

    // <Form onClick={handleHide}>
    <GridColumn verticalAlign="middle" textAlign="center">
      <Card centered onClick={handleHide}>
        <Image
          // style={{ padding: "auto" }}
          centered
          verticalAlign="top"
          size="tiny"
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

      {/* <button>checking</button>
      <Checkbox
        label="My Picture"

        // checked={isChecked.includes(photo.id)}
      /> */}
    </GridColumn>
    // </Form>
  );
}
