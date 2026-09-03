import { useState } from "react";

import Popup from "../Popup/Popup";

import "../../blocks/signinPopup.css";

function SignupPopup({ isOpen, onClose, onSignup, error }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    const isSuccess = await onSignup(name, email, password, confirmPassword);

    if (!isSuccess) {
      return;
    }

    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  }

  return (
    <Popup isOpen={isOpen} onClose={onClose}>
      <div className="auth-popup">
        <p className="auth-popup__eyebrow">JOIN THE TABLE</p>

        <h2 className="auth-popup__title">Crear cuenta</h2>

        <form className="auth-popup__form" onSubmit={handleSubmit}>
          <label className="auth-popup__field">
            <span className="auth-popup__label">Nombre</span>

            <input
              className="auth-popup__input"
              type="text"
              placeholder="Tu nombre"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>

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

          <label className="auth-popup__field">
            <span className="auth-popup__label">Confirmar contraseña</span>

            <input
              className="auth-popup__input"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
          </label>

          {error && <p className="auth-popup__error">{error}</p>}

          <button className="auth-popup__submit" type="submit">
            Registrarme
          </button>
        </form>
      </div>
    </Popup>
  );
}

export default SignupPopup;
