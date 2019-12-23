import React, { useContext, useState } from "react";
// import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
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
  Label
  //   Form
} from "semantic-ui-react";

import { FETCH_USER_POSTS } from "../query/fetchcurrentuserposts";
import { UPLOAD_FILE } from "../query/uploadFile";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import Images from "../components/Images";
import ProfileDescription from "../components/ProfileDescription";
// import LikeButton from "../components/LikeButton";
// import DeleteButton from "../components/DeleteButton";
// import MyPopup from "../util/MyPopup";

export default function UserProfile(props) {
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();
  const [isChecked, setIsChecked] = useState([]);

  const { loading, data } = useQuery(FETCH_USER_POSTS);
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    variables: { file },

    // refetchQueries: [{ query: FETCH_USER_POSTS }],

    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_POSTS
      });
      console.log(result.data.uploadFile.photos);
      const structure = {
        getMe: { ...data.getMe, photos: [...result.data.uploadFile.photos] }
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

  function handleFile(event) {
    console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  }

  function handleSubmit() {
    uploadFile();
  }
  function handleCheckBox(url) {
    console.log(url);
    //   if (isChecked.includes(id)) {
    //     const newList = isChecked.filter(photoId => photoId === id);
    //     setIsChecked([...newList]);
    //   } else setIsChecked([...isChecked, id]);
  }
  function handleImageUrl(link) {
    console.log(link);
  }
  console.log(isChecked);
  let posts = "";
  let photos = [];
  if (data) {
    posts = data.getMe.posts;
    photos = data.getMe.photos;
    console.log(data.getMe.profileDescription.body);
  }

  const userId = props.match.params.userId;
  const username = data ? data.getMe.username : "loading";
  const profilePicture = data ? data.getMe.profilePicture : "loading";
  const profileDescription = data ? data.getMe.profileDescription : "loading";
  const friendCount = data ? data.getMe.friends.length : "loading";

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
              <Card.Content extra as={Link} to={"/friends"}>
                <Icon name="user" />
                {friendCount}
              </Card.Content>
            </Card>
          </GridColumn>
          <GridColumn textAlign="center">
            MAKE DESCRIPTION FOR PROFILE HERE
            <ProfileDescription
              profileDescription={profileDescription}
              {...profileDescription}
            />
          </GridColumn>

          <GridColumn textAlign="center">
            Images
            <Grid celled>
              <GridColumn>
                <div style={{ marginBottom: "50px" }}>
                  <input type="file" onChange={handleFile}></input>
                  <button onClick={handleSubmit}>Upload</button>
                </div>

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
