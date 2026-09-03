import { useState } from "react";

import Popup from "../Popup/Popup";

import "../../blocks/signinPopup.css";

function SigninPopup({ isOpen, onClose, onSignin, onSignupClick, error }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    await onSignin(email, password);

    setEmail("");
    setPassword("");
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="auth-popup">
        <p className="auth-popup__eyebrow">WELCOME BACK</p>

        <h2 className="auth-popup__title">Iniciar sesión</h2>

        <form className="auth-popup__form" onSubmit={handleSubmit}>
          <label className="auth-popup__field">
            <span className="auth-popup__label">Correo electrónico</span>

            <input
              className="auth-popup__input"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

          <label className="auth-popup__field">
            <span className="auth-popup__label">Contraseña</span>

            <input
              className="auth-popup__input"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="auth-popup__error">{error}</p>}

          <button className="auth-popup__submit" type="submit">
            Iniciar sesión
          </button>

          <p className="auth-popup__switch">
            ¿No tienes cuenta?
            <button
              className="auth-popup__switch-button"
              type="button"
              onClick={onSignupClick}
            >
              Regístrate
            </button>
          </p>
        </form>
      </div>
    </Popup>
  );
}

export default SigninPopup;
