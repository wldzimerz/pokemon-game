import s from "./Navbar.module.css";
import classNames from "classnames";

const Navbar = ({ onShowMenu, isActive, bgActive = false }) => {
  const handleClick = () => {
    onShowMenu && onShowMenu();
  };
  return (
    <nav id={s.navbar} className={classNames(s.root, { [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={classNames(s.menuButton, { [s.active]: isActive })} onClick={handleClick}>
          <span />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
