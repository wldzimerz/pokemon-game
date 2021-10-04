import { useSelector } from "react-redux";
import { selectUser } from "../../../store/user";

import s from "./User.module.css";

const WEEK = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const User = () => {
  const userData = useSelector(selectUser);

  const getCreateDate = () => {
    const createDate = new Date(Number(userData.createdAt));
    return `${createDate.getHours()}:${createDate.getMinutes()}, ${WEEK[createDate.getDay()]} ${createDate.getDate()} ${
      MONTHS[createDate.getMonth()]
    } ${createDate.getFullYear()}`;
  };

  const logOut = () => {
    localStorage.removeItem("idToken");
    window.location.reload();
  };

  return (
    <>
      <div className={s.wrapper}>
        <p>Account created: {getCreateDate()}</p>
        <p>User E-mail: {userData.email}</p>
        <p>LocalID: {userData.localId}</p>
        <button onClick={logOut}>Logout</button>
      </div>
    </>
  );
};

export default User;
