import classNames from "classnames";

// import { ReactComponent as LogoSVG } from "../../../assets/pokemon-logo.svg";
import { ReactComponent as LoginSVG } from "../../../assets/Login.svg";

import s from "./Navbar.module.css";

const Navbar = ({ onShowMenu, isActive, bgActive = false, onClickLogin }) => {
  const handleClick = () => {
    onShowMenu && onShowMenu();
  };
  return (
    <nav id={s.navbar} className={classNames({ [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={s.loginAndMenu}>
          <div className={s.loginWrap} onClick={onClickLogin}>
            <LoginSVG />
          </div>
          <div className={classNames(s.menuButton, { [s.active]: isActive })} onClick={handleClick}>
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
