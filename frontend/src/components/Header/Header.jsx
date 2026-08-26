import { Link, NavLink } from "react-router-dom";

function Header({ isLoggedIn, currentUser, onSigninClick, onSignout }) {
  const customClassName = ({ isActive }) =>
    `header__link ${isActive ? "header__link_active" : ""}`;

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        SAADE
      </Link>

      <nav className="header__nav">
        <NavLink to="/" className={customClassName}>
          Inicio
        </NavLink>

        <NavLink to="/menu" className={customClassName}>
          Menú
        </NavLink>

        <NavLink to="/about" className={customClassName}>
          Nosotros
        </NavLink>

        <NavLink to="/reservation" className={customClassName}>
          Reservar
        </NavLink>

        <NavLink to="/explore" className={customClassName}>
          Explorar
        </NavLink>

        {isLoggedIn ? (
          <div className="header__user">
            <span className="header__username">Hola, {currentUser?.name}</span>

            <button
              className="header__logout"
              type="button"
              onClick={onSignout}
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          <button
            className="header__login"
            type="button"
            onClick={onSigninClick}
          >
            Iniciar sesión
          </button>
        )}
      </nav>
    </header>
  );
}

export default Header;
