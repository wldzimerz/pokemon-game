import { useEffect, useState } from "react";
import Input from "./Input/Input";

import s from "./LoginForm.module.css";

const LoginForm = ({ onSubmit, isResetField = false }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuth, setAuth] = useState(true);

  useEffect(() => {
    setEmail("");
    setPassword("");
  }, [isResetField]);

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit &&
      onSubmit({
        type: isAuth ? "login" : "signup",
        email,
        password,
      });
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
        <span className={s.question} onClick={() => setAuth(!isAuth)}>
          {isAuth ? "Register" : "Login"}
        </span>
      </div>
    </form>
  );
};

export default LoginForm;
