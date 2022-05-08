import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(password, email);
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form__title form__title_theme_dark">Вход</h1>
        {/* <p className="form__error">
          {message}
        </p> */}
        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            type="text"
            id="login-email"
            placeholder="E-mail"
            autoComplete="off"
            value={email || ""}
            onChange={handleEmailChange}
            required
          />
        </label>

        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            type="password"
            id="login-password"
            placeholder="Пароль"
            autoComplete="off"
            value={password || ""}
            onChange={handlePasswordChange}
            required
          />
        </label>

        <button type="submit" className="form__button form__button_theme_dark">
          Войти
        </button>
      </form>
    </div>
  );
};

export default Login;
