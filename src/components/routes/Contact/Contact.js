import s from "./Contact.module.css";

const Contact = () => {
  return (
    <div className={s.container}>
      <p className={s.contact}>
        You can contact me by email <span>kvkad13@bk.ru</span> or send a message to Telegram <span>@wdlzimerz</span>
      </p>
    </div>
  );
};
export default Contact;
