import s from "./About.module.css";

const About = () => {
  return (
    <>
      <p className={s.about}>This game was created during the React JS marathon by Zar Zakharov</p>
      <button>Change theme</button>
    </>
  );
};

export default About;
