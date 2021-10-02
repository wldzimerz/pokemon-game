import s from "./Input.module.css";

const Input = ({ value, label, type = "text", name, onChange }) => {
  return (
    <div className={s.root}>
      <input className={s.input} name={name} type={type} value={value} label={label} onChange={onChange} required />
      <span className={s.highlight}></span>
      <span className={s.bar}></span>
      <label className={s.label}>{label}</label>
    </div>
  );
};

export default Input;
