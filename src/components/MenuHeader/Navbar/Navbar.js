import classNames from "classnames";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

// import { ReactComponent as LogoSVG } from "../../../assets/pokemon-logo.svg";
import { ReactComponent as LoginSVG } from "../../../assets/Login.svg";
import { ReactComponent as UserSVG } from "../../../assets/User.svg";
import { selectLocalId, selectUserLoading } from "../../../store/user";

import s from "./Navbar.module.css";

const Navbar = ({ onShowMenu, isActive, bgActive = false, onClickLogin }) => {
  const isLoadingUser = useSelector(selectUserLoading);
  const localId = useSelector(selectLocalId);
  // console.log("isLoadingUser: ", isLoadingUser);

  const handleClick = () => {
    onShowMenu && onShowMenu();
  };

  return (
    <nav id={s.navbar} className={classNames({ [s.bgActive]: bgActive })}>
      <div className={s.navWrapper}>
        <p className={s.brand}>LOGO</p>
        <div className={s.loginAndMenu}>
          {!isLoadingUser && !localId && (
            <div className={s.loginWrap} onClick={onClickLogin}>
              <LoginSVG />
            </div>
          )}
          {!isLoadingUser && localId && (
            <Link className={s.loginWrap} to={"/user"}>
              <UserSVG />
            </Link>
          )}

          <div className={classNames(s.menuButton, { [s.active]: isActive })} onClick={handleClick}>
            <span />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
