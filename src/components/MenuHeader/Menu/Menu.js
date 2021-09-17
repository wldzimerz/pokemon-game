import s from "./Menu.module.css";
import classNames from "classnames";
import { Link } from "react-router-dom";

const PAGES = [
  {
    page: "HOME",
    to: "/",
  },
  {
    page: "GAME",
    to: "/game",
  },
  {
    page: "ABOUT",
    to: "/about",
  },
  {
    page: "CONTACT",
    to: "/contact",
  },
];

const Menu = ({ isActive, onShowMenu }) => {
  return (
    <div className={classNames(s.menuContainer, { [s.active]: isActive === true }, { [s.deactive]: isActive === false })}>
      <div className={s.overlay} />
      <div className={s.menuItems}>
        <ul>
          {PAGES.map(({ page, to }, index) => (
            <li key={index}>
              <Link to={to} onClick={onShowMenu}>
                {page}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Menu;
