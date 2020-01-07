import React, { useContext, useState } from "react";
// import gql from "graphql-tag";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { Link } from "react-router-dom";
import {
  Card,
  // Button,
  Grid,
  Header,
  Image,
  Icon,
  // Checkbox,
  // CardContent,
  Transition,
  GridColumn
  // Label
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
  const userId = props.match.params.userId;
  // console.log(userId);
  const { user } = useContext(AuthContext);
  const [file, setFile] = useState();
  // const [isChecked, setIsChecked] = useState([]);

  const { loading, data } = useQuery(FETCH_USER_POSTS);
  const [uploadFile] = useMutation(UPLOAD_FILE, {
    variables: { file },

    // refetchQueries: [{ query: FETCH_USER_POSTS }],

    update(proxy, result) {
      const data = proxy.readQuery({
        query: FETCH_USER_POSTS
      });
      // console.log(result.data.uploadFile.photos);
      const structure = {
        getMe: { ...data.getMe, photos: [...result.data.uploadFile.photos] }
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

  function handleFile(event) {
    // console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  }

  function handleSubmit() {
    uploadFile();
  }
  // function handleCheckBox(url) {
  //   // console.log(url);
  //   //   if (isChecked.includes(id)) {
  //   //     const newList = isChecked.filter(photoId => photoId === id);
  //   //     setIsChecked([...newList]);
  //   //   } else setIsChecked([...isChecked, id]);
  // }
  // function handleImageUrl(link) {
  //   // console.log(link);
  // }
  // console.log(isChecked);
  let posts = "";
  let photos = [];
  if (data) {
    posts = data.getMe.posts;
    photos = data.getMe.photos;
    // const [ids] = data.getMe.posts;
    // console.log(ids);
  }

  const username = data ? data.getMe.username : "loading";
  const profilePicture = data ? data.getMe.profilePicture : "loading";
  const profileDescription = data ? data.getMe.profileDescription : "loading";
  const friendCount = data ? data.getMe.friends.length : "loading";
  // const size = 'medium'
  // console.log(props);

  return (
    <div>
      <Grid columns={4} divided>
        <Grid.Row>
          {/* {loading ? <div>loading...</div> : null} */}
          {data ? (
            photos.map((photo, index) => {
              return (
                <Images
                  key={index}
                  photo={photo}
                  imageSize={"medium"}
                  {...photo}
                />
              );
            })
          ) : (
            <GridColumn>loading</GridColumn>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
}
