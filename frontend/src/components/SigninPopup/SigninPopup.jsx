import { useState } from "react";

import Popup from "../Popup/Popup";

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
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
        />
        {error && <p className="popup__error">{error}</p>}
        <button type="submit">Iniciar sesión</button>
        <p>
          ¿No tienes cuenta?{" "}
          <button type="button" onClick={onSignupClick}>
            Regístrate
          </button>
        </p>
      </form>
    </Popup>
  );
}

export default SigninPopup;
