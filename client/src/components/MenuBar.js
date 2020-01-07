import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useApolloClient } from "@apollo/react-hooks";

import { AuthContext } from "../context/auth";

export default function MenuBar(props) {
  const { user, logout } = useContext(AuthContext);
  const client = useApolloClient();
  const pathname = window.location.pathname;
  const path = pathname === "/" ? "home" : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  function handleLogOutCache(props) {
    localStorage.clear();
    client.clearStore();
    logout();
    // props.client.resetStore();
    // props.history.push("/");
  }
  const handleItemClick = (e, { name }) => setActiveItem(name);
  // console.log(props);
  const menuBar = user ? (
    <div>
      <Menu pointing secondary size="huge" color="blue">
        <Menu.Item
          name={user.username}
          active={activeItem === user.username}
          onClick={handleItemClick}
          as={Link}
          to={"/"}
        />
        <Menu.Item
          name={"My Profile"}
          active={activeItem === "My Profile"}
          onClick={handleItemClick}
          as={Link}
          to={`/MyProfile/${user.id}`}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="logout"
            active
            onClick={(logout, handleLogOutCache)}
          />
        </Menu.Menu>
      </Menu>
    </div>
  ) : (
    <div>
      <Menu pointing secondary size="massive" color="blue">
        <Menu.Item
          name="home"
          active={activeItem === "home"}
          onClick={handleItemClick}
          as={Link}
          to={"/"}
        />
        <Menu.Menu position="right">
          <Menu.Item
            name="login"
            active={activeItem === "login"}
            onClick={handleItemClick}
            as={Link}
            to={"/login"}
          />

          <Menu.Item
            name="register"
            active={activeItem === "register"}
            onClick={handleItemClick}
            as={Link}
            to={"/register"}
          />
        </Menu.Menu>
      </Menu>
    </div>
  );
  return menuBar;
}
