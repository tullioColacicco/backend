import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./pages/AuthRoute";
import LoggedOut from "./pages/LoggedOut";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import SinglePost from "./pages/SinglePost";
import UserProfile from "./pages/UserProfile";
import Friends from "./pages/Friends";
import Messages from "./pages/Messages";
import FriendProfile from "./pages/FriendProfile";
import LockedProfile from "./pages/LockedProfile";
import Chat from "./pages/Chat";
import Images from "./pages/Images";
import UserImage from "./pages/UserImage";

import HamBurgerMenu from "./components/HamburgerMenu";

function App(props) {
  return (
    <AuthProvider>
      <Router>
        <Container fluid>
          <HamBurgerMenu />
          <Container>
            <MenuBar props={props} />

            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <LoggedOut
              exact
              path="/MyProfile/:userId"
              component={UserProfile}
            />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/messages" component={Messages} />
            <Route exact path="/images" component={Images} />
            <Route exact path="/images/:id" component={UserImage} />
            <Route exact path="/friends/:friendId" component={FriendProfile} />
            <LoggedOut
              exact
              path="/profile/:friendId"
              component={LockedProfile}
            />
            <Route exact path="/messages/:chatId" component={Chat} />
          </Container>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
