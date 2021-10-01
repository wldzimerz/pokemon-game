import { useState } from "react";
import { NotificationManager } from "react-notifications";

import Menu from "./Menu/Menu";
import Navbar from "./Navbar/Navbar";
import Modal from "./../Modal/Modal";
import LoginForm from "./../LoginForm/LoginForm";

const register = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDy1sDj0DfDle73TmkkC-73-5bTRlrexes";
const login = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDy1sDj0DfDle73TmkkC-73-5bTRlrexes";

const MenuHeader = ({ bgActive }) => {
  const [isActive, setActive] = useState(null);
  const [isOpenModal, setOpenModal] = useState(false);

  const handleShowMenu = () => {
    setActive((prevState) => !prevState);
  };

  const handleClickLogin = () => {
    setOpenModal((prevState) => !prevState);
  };

  const handleSubmitLoginForm = async ({ email, password, isAuth }) => {
    const requestOptions = {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
    };
    const response = await fetch(isAuth ? login : register, requestOptions).then((res) => res.json());
    console.log("response: ", response);
    if (response.hasOwnProperty("error")) {
      NotificationManager.error(response.error.message, "Wrong!");
    } else {
      localStorage.setItem("idToken", response.idToken);
      NotificationManager.success("Success!");
    }
    handleClickLogin();
  };

  return (
    <>
      <Menu isActive={isActive} onShowMenu={handleShowMenu} />
      <Navbar onShowMenu={handleShowMenu} bgActive={bgActive} isActive={isActive} onClickLogin={handleClickLogin} />
      <Modal isOpen={isOpenModal} title="Log in" onCloseModal={handleClickLogin}>
        <LoginForm onSubmit={handleSubmitLoginForm} />
      </Modal>
    </>
  );
};

export default MenuHeader;
