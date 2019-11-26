import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Container } from "semantic-ui-react";

import "semantic-ui-css/semantic.min.css";
import "./App.css";

import { AuthProvider } from "./context/auth";
import AuthRoute from "./pages/AuthRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MenuBar from "./components/MenuBar";
import SinglePost from "./pages/SinglePost";
import UserProfile from "./pages/UserProfile";
import Friends from "./pages/Friends";
import FriendProfile from "./pages/FriendProfile";

import HamBurgerMenu from "./components/HamburgerMenu";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Container fluid>
          <HamBurgerMenu />
          <Container>
            <MenuBar />

            <Route exact path="/" component={Home} />
            <AuthRoute exact path="/login" component={Login} />
            <AuthRoute exact path="/register" component={Register} />
            <Route exact path="/MyProfile/:userId" component={UserProfile} />
            <Route exact path="/posts/:postId" component={SinglePost} />
            <Route exact path="/friends" component={Friends} />
            <Route exact path="/friends/:friendId" component={FriendProfile} />
          </Container>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
