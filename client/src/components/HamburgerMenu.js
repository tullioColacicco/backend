// import { useBooleanKnob } from "@stardust-ui/docs-components";
import React, { useState } from "react";
import { Icon, Button } from "semantic-ui-react";
import SideBar from "./Sidebar";

const SidebarExampleSidebar = () => {
  const [menu, setMenu] = useState(true);

  function handleClick() {
    setMenu(!menu);
  }
  return (
    <div className="hamburger">
      <Button
        size="massive"
        color="black"
        floated="left"
        direction="left"
        attached="left"
        onClick={() => setMenu(!menu)}
      >
        <Icon name="bars"></Icon>
      </Button>
      {<SideBar menu={menu} handleClick={handleClick} />}
    </div>
  );
};

export default SidebarExampleSidebar;
