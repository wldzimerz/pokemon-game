import s from "./Menu.module.css";
import classNames from "classnames";

const MENU = [
  {
    page: "HOME",
    link: "#welcome",
  },
  {
    page: "GAME",
    link: "#game",
  },
  {
    page: "ABOUT",
    link: "#about",
  },
  {
    page: "CONTACT",
    link: "#contact",
  },
];

const Menu = ({ isActive }) => {
  const handleClickMenu = () => {
    console.log("click on menu item");
  };
  return (
    <div className={classNames(s.menuContainer, { [s.active]: isActive }, { [s.deactive]: !isActive })} onClick={handleClickMenu}>
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {MENU.map(({ page, link }, index) => (
            <li key={index}>
              <a href={link}>{page}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
