import { React, useState } from "react";
import { Link } from "react-router-dom";
import Login from "./Login";

const Register = ({ onRegister }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  // const [message, setMessage] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(password, email);
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} className="form">
        <h1 className="form__title form__title_theme_dark">Register</h1>
        {/* <p className="form__error">
          {message}
        </p> */}
        <label className="form__field">
          <input
            className="form__input form__input_theme_dark"
            type="text"
            id="register-email"
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
            id="register-password"
            placeholder="Password"
            autoComplete="off"
            value={password || ""}
            onChange={handlePasswordChange}
            required
          />
        </label>

        <button type="submit" className="form__button form__button_theme_dark">
          Register
        </button>

        <div className="register__signup-prompt">
          <Link to="/login" className="register__signup-link">
            <p className="register__signup-prompt-text">
              Already registered? Log in
            </p>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
