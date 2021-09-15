// import s from "./GamePage.module.css";

const GamePage = ({ onChangePage }) => {
  const handleClick = () => {
    onChangePage && onChangePage("app");
  };
  return (
    <div>
      This is Game Page!
      <button onClick={handleClick}>Home</button>
    </div>
  );
};

export default GamePage;
