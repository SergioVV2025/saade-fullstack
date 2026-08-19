import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">Silver Lake · Los Angeles</p>

        <h1 className="hero__title">
          Eat well.
          <br />
          Stay awhile.
        </h1>

        <p className="hero__description">
          Food, drinks, music and good company on Sunset Boulevard.
        </p>

        <div className="hero__actions">
          <Link className="hero__button hero__button_primary" to="/reservation">
            Reserve a table
          </Link>

          <Link className="hero__button hero__button_secondary" to="/menu">
            View menu
          </Link>
        </div>
      </div>

      <div className="hero__graphic" aria-hidden="true">
        <span className="hero__star">✦</span>
        <span className="hero__word">saade</span>
      </div>
    </section>
  );
}

export default Hero;
