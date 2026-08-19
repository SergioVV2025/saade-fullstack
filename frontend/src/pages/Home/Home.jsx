import Hero from "../../components/Hero/Hero";
import { Link } from "react-router-dom";

function Home() {
  return (
    <main className="content">
      <Hero />

      <section className="home-section home-section_menu">
        <p className="home-section__eyebrow">Eat & drink</p>
        <h2 className="home-section__title">Discover the menu</h2>
        <Link className="home-section__link" to="/menu">
          Explore menu →
        </Link>
      </section>

      <section className="home-section home-section_reservation">
        <p className="home-section__eyebrow">Come hang</p>
        <h2 className="home-section__title">Save your table</h2>
        <Link className="home-section__link" to="/reservation">
          Reserve →
        </Link>
      </section>
    </main>
  );
}

export default Home;
