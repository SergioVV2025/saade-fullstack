import { Link, NavLink } from "react-router-dom";

function Header() {
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
      </nav>
    </header>
  );
}

export default Header;
