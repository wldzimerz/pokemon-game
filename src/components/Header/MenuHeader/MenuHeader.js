import { useState } from "react";
import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";

const MenuHeader = () => {
  const [isActive, setActive] = useState(false);

  const handleShowMenu = () => {
    setActive(!isActive);
  };

  return (
    <>
      <Menu isActive={isActive} />
      <Navbar onShowMenu={handleShowMenu} isActive={isActive} />
    </>
  );
};

export default MenuHeader;
