import s from "./Layout.module.css";

const Layout = (props) => {
  const back = props.urlBg ? { backgroundImage: `url(${props.urlBg})` } : { backgroundColor: props.colorBg };
  return (
    <section className={s.root} style={back}>
      <div className={s.wrapper}>
        <article>
          <div className={s.title}>
            <h3>{props.title}</h3>
            <span className={s.separator}></span>
          </div>
          <div className={`{${s.desc}, ${s.full}}`}>
            <p> {props.descr} </p>
          </div>
        </article>
      </div>
    </section>
  );
};

export default Layout;
