import { useState } from "react";
import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(false);

  const handleShowMenu = () => {
    setActive((prevState) => !prevState);
  };

  return (
    <>
      <Menu isActive={isActive} onShowMenu={handleShowMenu} />
      <Navbar onShowMenu={handleShowMenu} bgActive={bgActive} isActive={isActive} />
    </>
  );
};

export default MenuHeader;
