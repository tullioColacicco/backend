// import { useBooleanKnob } from "@stardust-ui/docs-components";
import React, { useState } from "react";
import { Icon, Menu, Sidebar } from "semantic-ui-react";
import { Link } from "react-router-dom";

const SidebarExampleSidebar = ({ menu, handleClick }) => {
  // const [visible, setVisible] = useState(menu);
  const [activeItem, setActiveItem] = useState();
  // console.log(activeItem);
  function handleSelect(name) {
    setActiveItem(name);
    // console.log(name);
  }
  return (
    <div className="sidebar">
      <Sidebar
        as={Menu}
        animation="overlay"
        icon="labeled"
        inverted
        vertical
        visible={menu}
        width="thin"
        direction="left"
      >
        <Menu.Item as="a" onClick={() => handleClick()}>
          <Icon name="bars" />
          Menu
        </Menu.Item>
        <Menu.Item
          as={Link}
          active={activeItem === "home"}
          onClick={(e, { name }) => handleSelect(name)}
          name={"home"}
          to={"/"}
        >
          <Icon name="home" />
          Home
        </Menu.Item>
        <Menu.Item
          active={activeItem === "friends"}
          as={Link}
          onClick={(e, { name }) => handleSelect(name)}
          name={"friends"}
          to={"/friends"}
        >
          <Icon name="user circle" />
          Friends
        </Menu.Item>
        <Menu.Item
          active={activeItem === "messages"}
          as={Link}
          onClick={(e, { name }) => handleSelect(name)}
          name={"messages"}
          to={"/messages"}
        >
          <Icon name="envelope" />
          Messages
        </Menu.Item>
        <Menu.Item
          active={activeItem === "matches"}
          as={Link}
          onClick={(e, { name }) => handleSelect(name)}
          name={"matches"}
          to={"/matches"}
        >
          <Icon name="heart" />
          Matches
        </Menu.Item>
      </Sidebar>
    </div>
  );
};

export default SidebarExampleSidebar;
