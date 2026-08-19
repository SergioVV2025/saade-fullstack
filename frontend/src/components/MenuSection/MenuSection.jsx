function MenuSection({ title, children }) {
  return (
    <section className="menu-section">
      <h2 className="menu-section__title">{title}</h2>

      <div className="menu-section__items">{children}</div>
    </section>
  );
}

export default MenuSection;
