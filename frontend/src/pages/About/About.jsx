function About() {
  return (
    <main className="about">
      <section className="about__hero">
        <p className="about__eyebrow">SILVER LAKE · LOS ANGELES</p>

        <h1 className="about__title">
          Come hungry.
          <br />
          Stay awhile.
        </h1>

        <p className="about__intro">
          Saade is a neighborhood spot built around good food, cold drinks and
          good company.
        </p>
      </section>

      <section className="about__story">
        <div className="about__story-heading">
          <p className="about__eyebrow">ABOUT SAADE</p>
          <h2 className="about__subtitle">
            Made for
            <br />
            hanging out.
          </h2>
        </div>

        <div className="about__story-text">
          <p>
            Located in Silver Lake, Saade brings together food, drinks and music
            in a relaxed space made for sharing.
          </p>

          <p>
            Come for a bite, stay for another drink, and make yourself at home.
          </p>
        </div>
      </section>

      <section className="about__statement">
        <p>FOOD · DRINKS · MUSIC · GOOD COMPANY</p>
      </section>
    </main>
  );
}

export default About;
