import { useState } from "react";
import Input from "./Input/Input";

import s from "./LoginForm.module.css";

const LoginForm = ({ onSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setAuth] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit &&
      onSubmit({
        email,
        password,
        isAuth,
      });
    setEmail("");
    setPassword("");
  };

  const handleClickLogin = () => {
    setAuth((prevState) => !prevState);
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <Input value={email} name="email" label="Email" onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <Input value={password} type="password" name="password" label="Password" onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className={s.flex}>
        <button type="submit">{isAuth ? "Sign in" : "Sign up"}</button>
        <span className={s.question} onClick={handleClickLogin}>
          {isAuth ? "Register" : "Login"}
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
