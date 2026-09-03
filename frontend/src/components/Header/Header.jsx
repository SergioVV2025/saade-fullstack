import { Link, NavLink } from "react-router-dom";
import { useState } from "react"; /* para 390px */

function Header({ isLoggedIn, currentUser, onSigninClick, onSignout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const customClassName = ({ isActive }) =>
    `header__link ${isActive ? "header__link_active" : ""}`;

  const handleNavClick = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <Link className="header__logo" to="/">
        SAADE
      </Link>
      <button
        className="header__menu-button"
        type="button"
        aria-expanded={isMenuOpen}
        aria-controls="header-navigation"
        onClick={() => setIsMenuOpen((current) => !current)}
      >
        Menú
      </button>

      <nav
        id="header-navigation"
        className={`header__nav ${isMenuOpen ? "header__nav_open" : ""}`}
      >
        <NavLink to="/" className={customClassName} onClick={handleNavClick}>
          Inicio
        </NavLink>

        <NavLink
          to="/menu"
          className={customClassName}
          onClick={handleNavClick}
        >
          Menú
        </NavLink>

        <NavLink
          to="/about"
          className={customClassName}
          onClick={handleNavClick}
        >
          Nosotros
        </NavLink>

        <NavLink
          to="/reservation"
          className={customClassName}
          onClick={handleNavClick}
        >
          Reservar
        </NavLink>

        <NavLink
          to="/explore"
          className={customClassName}
          onClick={handleNavClick}
        >
          Explorar
        </NavLink>
        {isLoggedIn && (
          <NavLink
            to="/my-reservations"
            className={customClassName}
            onClick={handleNavClick}
          >
            Mis reservaciones
          </NavLink>
        )}
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
