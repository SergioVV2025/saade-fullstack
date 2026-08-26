import { useState } from "react";

import Popup from "../Popup/Popup";

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
      <h2>Crear cuenta</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

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
        <input
          type="password"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(event) => setConfirmPassword(event.target.value)}
          required
        />
        {error && <p className="popup__error">{error}</p>}
        <button type="submit">Registrarme</button>
      </form>
    </Popup>
  );
}

export default SignupPopup;
