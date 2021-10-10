import { useState } from "react";
import { useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";

import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";
import Modal from "./../Modal/Modal";
import LoginForm from "./../LoginForm/LoginForm";
import { getUserUpdateAsync } from "../../store/user";
import request from "./../../services/request";

const REGISTER = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDy1sDj0DfDle73TmkkC-73-5bTRlrexes";
const LOGIN = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDy1sDj0DfDle73TmkkC-73-5bTRlrexes";

const MenuHeader = ({ bgActive }) => {
  const dispatch = useDispatch();

  const [isActive, setActive] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleShowMenu = () => {
    setActive((prevState) => !prevState);
  };

  const handleClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleSubmitLoginForm = async ({ email, password, type }) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };
    const response = await fetch(type === "login" ? LOGIN : REGISTER, requestOptions).then((res) => res.json());
    if (response.hasOwnProperty("error")) {
      NotificationManager.error(response.error.message, "Wrong!");
    } else {
      if (type === "signup") {
        const pokemonsStart = await request.getStarterKit();
        for (const item of pokemonsStart.data) {
          await fetch(`https://pokemon-game-12c18-default-rtdb.firebaseio.com/${response.localId}/pokemons.json?auth=${response.idToken}`, {
            method: "POST",
            body: JSON.stringify(item),
          });
        }
      }
      localStorage.setItem("idToken", response.idToken);
      NotificationManager.success("Success!");
      dispatch(getUserUpdateAsync());
      handleClickLogin();
    }
  };

  return (
    <>
      <Menu isActive={isActive} onShowMenu={handleShowMenu} />
      <Navbar onShowMenu={handleShowMenu} bgActive={bgActive} isActive={isActive} onClickLogin={handleClickLogin} />
      <Modal isOpen={isOpenModal} title="Log in" onCloseModal={handleClickLogin}>
        <LoginForm isResetField={!isOpenModal} onSubmit={handleSubmitLoginForm} />
      </Modal>
    </>
  );
};

export default MenuHeader;
