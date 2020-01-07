import React, { useContext } from "react";
// import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link, Redirect } from "react-router-dom";
import {
  Card,
  Button,
  Grid,
  Image,
  // Icon,
  // Checkbox,
  // CardContent,
  // Transition,
  GridColumn
  // Label
  //   Form
} from "semantic-ui-react";

import { GET_LOCKED_USER } from "../query/getLockedUser";

import { ADD_FRIEND } from "../query/addFriend";

import { AuthContext } from "../context/auth";

import Images from "../components/Images";
import ProfileDescription from "../components/ProfileDescription";
// import LikeButton from "../components/LikeButton";
// import DeleteButton from "../components/DeleteButton";
// import MyPopup from "../util/MyPopup";

export default function LockedProfile(props) {
  const userId = props.match.params.friendId;

  const { user } = useContext(AuthContext);
  // console.log(user);
  // const [file, setFile] = useState();
  // const [isChecked, setIsChecked] = useState([]);

  const { loading, data } = useQuery(GET_LOCKED_USER, {
    variables: { userId }
  });
  const [addFriend] = useMutation(ADD_FRIEND, {
    variables: { userId }
  });

  function handleAddFriend() {
    try {
      addFriend();
    } catch (error) {
      console.log(error);
    }
  }

  // console.log(isChecked);
  let posts = "";
  let photos = [];
  if (data) {
    // console.log(data.getUser.posts);
    // console.log(user.id);
  }

  const friendIds = data ? data.getUser.friends : "loading";
  // console.log(friendIds);
  const friendIdArray = data ? friendIds.map(friend => friend.id) : "loading";
  // console.log(friendIdArray);

  const alreadyFriends = friendIdArray.includes(user.id);
  // console.log(alreadyFriends);

  const username = data ? data.getUser.username : "loading";
  const profilePicture = data ? data.getUser.profilePicture : "loading";
  const profileDescription = data ? data.getUser.profileDescription : "loading";
  const friendCount = data ? data.getUser.friends.length : "loading";

  // console.log(props);

  return (
    <div>
      {alreadyFriends ? (
        <Redirect to={`/friends/${userId}`} />
      ) : (
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
                  <Card.Content extra>
                    <Button
                      size="mini"
                      icon="user"
                      basic
                      as={Link}
                      to={"/friends"}
                    >
                      {/* <Icon name="user" /> */}
                    </Button>
                    {friendCount}
                    <Button
                      floated="right"
                      //   icon="plus square outline"
                      size="mini"
                      as={Link}
                      to={`/friends/${userId}`}
                      onClick={handleAddFriend}
                    >
                      Add Friend
                      {/* <Icon name="plus square outline" corner="bottom right" /> */}
                    </Button>
                  </Card.Content>
                </Card>
              </GridColumn>
              <GridColumn textAlign="center">
                MAKE DESCRIPTION FOR PROFILE HERE
                <ProfileDescription
                  profileDescription={profileDescription}
                  userId={userId}
                  {...profileDescription}
                />
              </GridColumn>

              <GridColumn textAlign="center">
                Images
                <Grid celled>
                  <GridColumn>
                    <Grid columns={4} divided>
                      <Grid.Row>
                        {/* {loading ? <div>loading...</div> : null} */}
                        {data ? (
                          photos.map((photo, index) => {
                            return (
                              <Images key={index} photo={photo} {...photo} />
                            );
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
          <Grid columns={4} divided></Grid>
        </div>
      )}
    </div>
  );
}
