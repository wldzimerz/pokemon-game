import { Link } from "react-router-dom";
import s from "./NotFound.module.css";

const NotFound = () => {
  return (
    <div className={s.notfound}>
      404 Not Found <br />
      <Link to={"/"}>Home</Link>
    </div>
  );
};
export default NotFound;
