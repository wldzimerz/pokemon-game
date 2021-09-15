import s from "./Menu.module.css";
import classNames from "classnames";

const Menu = ({ isActive }) => {
  const handleClickMenu = () => {
    console.log("click on menu item");
  };
  return (
    <div className={classNames(s.menuContainer, { [s.active]: !isActive }, { [s.deactive]: isActive })} onClick={handleClickMenu}>
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          <li>
            <a href="#welcome">HOME</a>
          </li>
          <li>
            <a href="#game">GAME</a>
          </li>
          <li>
            <a href="#about">ABOUT</a>
          </li>
          <li>
            <a href="#contact">CONTACT</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menu;
