import s from "./Layout.module.css";

const Layout = ({ title, descr, urlBg, colorBg = "#e2e2e2" }) => {
  const back = urlBg && { backgroundImage: `url(${urlBg})` } ? { backgroundImage: `url(${urlBg})` } : { backgroundColor: colorBg };
  return (
    <section className={s.root} style={back}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{title}</h3>
            <span className={s.separator}></span>
          </div>
          <div className={`{${s.desc}, ${s.full}}`}>
            <p> {descr} </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
