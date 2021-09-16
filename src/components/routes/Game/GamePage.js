import { useHistory } from "react-router-dom";
// import s from "./GamePage.module.css";

const GamePage = () => {
  const history = useHistory();
  const handleClick = () => {
    history.push("/");
  };
  return (
    <>
      <div>This is Game Page!</div>
      <button onClick={handleClick}>Home</button>
    </>
  );
};

export default GamePage;
