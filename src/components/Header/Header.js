import s from "./Header.module.css";

const Header = ({ title, descr, onClickStart }) => {
  return (
    <header className={s.root}>
      <div className={s.forest}></div>
      <div className={s.silhouette}></div>
      <div className={s.moon}></div>
      <div className={s.container}>
        <h1>{title}</h1>
        <p>{descr}</p>
        <button onClick={onClickStart}>Start game!</button>
      </div>
    </header>
  );
};

export default Header;
