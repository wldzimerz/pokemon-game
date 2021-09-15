import s from "./Navbar.module.css";
import classNames from "classnames";

const Navbar = ({ onShowMenu, isActive }) => {
  const handleClick = () => {
    onShowMenu && onShowMenu();
  };
  return (
    <nav className={s.root}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <a className={classNames(s.menuButton, { [s.active]: isActive })} href="#s">
          <span onClick={handleClick} />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
